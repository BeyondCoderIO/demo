/**
 * Strategy for local connect
 */
var express       = require('express'),
    crypto        = require('crypto'),
    Cookies       = require('cookies'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, passport) {
    var router = express.Router();
    app.use('/', router);

    passport.use('login', new LocalStrategy({
                usernameField: 'login',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, username, password, done) {
                app.models.Account.find({
                    where: {
                        'act_email': username
                    }
                }).then(function (account) {
                    if (!account) {
                        return done(null, false, req.flash('message', req.translate('system', 'User Not found.')));
                    }
                    if (!account.validatePassword(password)) {
                        return done(null, false, req.flash('message', req.translate('system', 'Invalid Password')));
                    }
                    return app.models.AccessToken.create({
                        'atok_token': crypto.randomBytes(32).toString('hex'),
                        'act_id': account.act_id,
                        'atok_type': 'access'
                    }).then(function (accessToken) {
                        var cookie = new Cookies(req, req.res);
                        cookie.set("authorization", 'Bearer ' + accessToken.atok_token);

                        account = account.toJSON();
                        account.accessTokenID = accessToken.atok_id;
                        return done(null, account);
                    });
                }).catch(function (err) {
                    return done(null, false, req.flash('message', req.translate('system',
                        err.errors ? err.errors.map(function (error) {
                            return req.translate('system', error.message);
                        }).join('\n')
                            : (req.translate('system', err.message) || JSON.stringify(err))
                    )));
                });
            })
    );

    passport.use('signup', new LocalStrategy({
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            var form = req.body;

            app.models.Account.find({
                where: {
                    'act_email': username
                }
            }).then(function (account) {
                if (account) {
                    return done(null, false, req.flash('message', req.translate('system', 'Account with same username already exist.')));
                }
                account = app.models.Account.build({
                    'act_email' : username,
                    'act_password' : password
                });

                account.save().then(function(account) {
                    return app.models.AccessToken.create({
                        'atok_token': crypto.randomBytes(32).toString('hex'),
                        'act_id': account.act_id,
                        'atok_type': 'access'
                    }).then(function (accessToken) {
                        var cookie = new Cookies(req, req.res);
                        cookie.set("authorization", 'Bearer ' + accessToken.atok_token);

                        account = account.toJSON();
                        account.accessTokenID = accessToken.atok_id;
                        return done(null, account);
                    });
                }).catch(function (err) {
                    return done(null, false, req.flash('message', req.translate('system',
                        err.errors ? err.errors.map(function (error) {
                            return req.translate('system', error.message);
                        }).join('\n')
                            : (req.translate('system', err.message) || JSON.stringify(err))
                    )));
                });
            });
        })
    );

    router.post('/login',
        passport.authenticate('login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }));

    router.post('/signup',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res, next) {
            passport.authenticate('signup', function (err, user, info, status) {
                if (!user) {
                    return res.redirect('/signup');
                }
                req.login(user, function () {
                    res.redirect('/');
                });
            })(req, res, next);
        });

    router.post('/lostpassword',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            var email = req.body.email;

            app.models.Account.find({
                where: {
                    'act_email': email
                }
            }).then(function (account) {
                if (!account) {
                    req.flash('message', req.translate('system', 'No account found with this email address.'));
                    return res.redirect('/lostpassword');
                }

                return app.models.AccessToken.create({
                    'atok_token': crypto.randomBytes(32).toString('hex'),
                    'act_id': account.act_id,
                    'atok_type': 'recovery'
                }).then(function (recoveryToken) {
                    app.mailer.sendMail({
                        to: email,
                        subject: req.translate('system', '[ Demo ] - lost password request'),
                        text: req.translate('mails/lostPasswordRequest', {
                            __LINK__: app.config.servers.self.baseURL + '/lostpassword/' + recoveryToken.atok_token
                        })
                    });

                    res.render('site/lostpassword-success', {
                        __layout: "layouts/login",
                        message: req.translate('system', 'An email containing the procedure for obtaining a new password has been sent to you.')
                    });
                });
            }).catch(function (err) {
                req.flash('message', req.translate('system',
                    err.errors ? err.errors.map(function (error) {
                        return req.translate('system', error.message);
                    }).join('\n')
                        : (req.translate('system', err.message) || JSON.stringify(err))
                ));
                return res.redirect('/lostpassword');
            });
        });

    router.get('/lostpassword/:token',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            app.models.AccessToken.find({
                where: {
                    atok_token: req.params.token,
                    atok_type: 'recovery'
                }
            }).then(function(accessToken) {
                if (!accessToken) {
                    req.flash('message', req.translate('system', 'Token invalid or expired.'));
                    return res.redirect('/lostpassword');
                }

                req.session.lostpasswordRequest = {
                    'token': accessToken.atok_token,
                    'act_id': accessToken.act_id
                };
                accessToken.destroy();

                res.render('site/newpassword', {
                    __layout: "layouts/login"
                });
            }).catch(function (err) {
                req.flash('message', req.translate('system',
                    err.errors ? err.errors.map(function (error) {
                        return req.translate('system', error.message);
                    }).join('\n')
                        : (req.translate('system', err.message) || JSON.stringify(err))
                ));
                return res.redirect('/lostpassword');
            });
        });

    router.post('/lostpassword/:token',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function(req, res) {
            if (!req.session.lostpasswordRequest || req.session.lostpasswordRequest.token != req.params.token) {
                req.flash('message', req.translate('system', 'Token invalid or expired.'));
                return res.redirect('/lostpassword');
            }
            app.models.Account.find({
                'act_id': req.session.lostpasswordRequest.act_id
            }).then(function(account) {
                if (!account) {
                    req.flash('message', req.translate('system', 'Token invalid or expired.'));
                    return res.redirect('/lostpassword');
                }

                account.act_password = req.body.password;
                account.save().then(function(account) {
                    delete req.session.lostpasswordRequest;

                    return app.models.AccessToken.create({
                        'atok_token': crypto.randomBytes(32).toString('hex'),
                        'act_id': account.act_id,
                        'atok_type': 'access'
                    }).then(function (accessToken) {
                        var cookie = new Cookies(req, res);
                        cookie.set("authorization", 'Bearer ' + accessToken.atok_token);

                        account = account.toJSON();
                        account.accessTokenID = accessToken.atok_id;

                        req.login(account, function () {
                            res.redirect('/');
                        });
                    });
                }).catch(function (err) {
                    req.flash('message', req.translate('system',
                        err.errors ? err.errors.map(function (error) {
                            return req.translate('system', error.message);
                        }).join('\n')
                            : (req.translate('system', err.message) || JSON.stringify(err))
                    ));
                    return res.redirect('/lostpassword');
                });
            });
        });
};
