/**
 * This is the controller for table "Account".
 */
var express = require('express'),
    async = require('async'),
    Cookies = require('cookies'),
    S = require('string'),
    logger = global.logger;

module.exports = function (app) {
    initRoutes(app);
    initApis(app);
};

function initRoutes(app) {
    var router = express.Router();
    app.use('/account', router);

    // List All models of Account
    router.get('/',
        app.requirePermission([
            ['allow', {
                users:['@']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function (req, res) {
            var cookie = new Cookies(req, res),
                Query = cookie.get("Account_query"),
                limit = req.query.limit || 25,
                page = req.query.page || 1,
                sort = req.query["Account_sort"],
                query = {
                    where: {},
                    include: [],
                    offset: (page - 1) * limit,
                    limit: limit,
                    order: sort
                };

            // Load filters from cookies
            try {
                Query = Query ? JSON.parse(decodeURIComponent(Query)) : {};
            } catch (e) {
                Query = {};
            }
            // If isAjax load filters from query
            if (req.query.ajax) {
                Query = req.query.q || {};
                cookie.set("Account_query", encodeURIComponent(JSON.stringify(Query)));
            }

            // Add filters 
            if (!S(Query.act_login).isEmpty()) query.where.act_login = {like:Query.act_login + '%'};
            if (!S(Query.act_email).isEmpty()) query.where.act_email = {like:Query.act_email + '%'};
            if (!S(Query.act_status).isEmpty()) query.where.act_status = Query.act_status;

            app.models["Account"].findAndCountAll(query).then(function (result) {
                res.render('account/index', {
                    "breadcrumbs": [
                        {"label": req.translate('account', 'title'), "url": '/account'}
                    ],
                    "Query": Query,
                    "rows": result.rows,
                    "page": page,
                    "limit": limit,
                    "sort": sort,
                    "count": result.count
                });
            });
        });

    // Render form for create a Account
    router.get('/new',
        app.requirePermission([
            ['allow', {
                users:['@'],
                roles: ['super-admin', 'admin']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function (req, res) {
            res.render('account/create', {
                "breadcrumbs": [
                    {"label": req.translate('account', 'title'), "url": '/account'},
                    {"label": req.translate('system', 'Create')}
                ],
                "account": app.models["Account"].build({})
            });
        });

    // Render form for update a Account
    router.get('/:id(\\d+)',
        app.requirePermission([
            ['allow', {
                users:['@']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function (req, res) {
            var query = {
                where: {
                    "act_id": req.params.id
                },
                include: []
            };

            // Add relations 

            app.models["Account"].find(query).then(function (result) {
                if (!result) return res.redirect('/account');

                res.render('account/update', {
                    "breadcrumbs": [
                        {"label": req.translate('account', 'title'), "url": '/account'},
                        {"label": req.params.id + ' - ' + req.translate('system', 'Update')}
                    ],
                    "account": result
                });
            });
        });
}

function initApis(app) {
    var router = express.Router();
    app.use('/api/account', router);

    // List All models of Account
    router.get('/',
        app.requirePermission([
            ['allow', {
                users:['@']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function (req, res) {
            var query = {
                where: {},
                include: []
            };

            app.models["Account"].findAll(query).then(function(results) {
                res.json(results);
            });
        });

    // Create / Update a Account
    router.post('/',
        app.requirePermission([
            ['allow', {
                users:['@']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function (req, res) {
            var Record = req.body;

            if (!Record["act_id"])
                return createRecord();
            return updateRecord();

            function createRecord() {
                if (!app.requirePermission.roles('allow', ['super-admin', 'admin']).check(req.account)) {
                    return reply(req.translate('system', 'You do not have permissions to create a user.'));
                }
                var record = app.models["Account"].build({});

                // Add fields 
                if (!S(Record.act_login).isEmpty()) record.act_login = Record.act_login;
                if (!S(Record.act_password).isEmpty()) record.act_password = Record.act_password;
                if (!S(Record.act_email).isEmpty()) record.act_email = Record.act_email;
                if (!S(Record.act_role).isEmpty()) record.act_role = Record.act_role;
                if (!S(Record.act_status).isEmpty()) record.act_status = Record.act_status;

                record.save().then(function (record) {
                    reply(null, record);
                }).catch(function (err) {
                    reply(err);
                });
            }
            function updateRecord() {
                app.models["Account"].find({
                    "where":{
                        "act_id": Record["act_id"]
                    }
                }).then(function (record) {
                    if (!record) return reply(req.translate('system', 'Record not found'));
                    if (app.requirePermission.roles('allow', ['super-admin']).check(req.account)) {
                        // super-admin has all permissions
                    } else if (app.requirePermission.roles('allow', ['admin']).check(req.account)) {
                        if (app.requirePermission.roles('allow', ['super-admin']).check(record)) {
                            return reply(req.translate('system', 'You do not have permissions update this user.'))
                        }
                    } else if (req.account['act_id'] != record['act_id']) {
                        return reply(req.translate('system', 'You do not have permissions update this user.'))
                    }

                    // Update fields 
                if (!S(Record.act_login).isEmpty()) record.act_login = Record.act_login;
                if (!S(Record.act_password).isEmpty()) record.act_password = Record.act_password;
                if (!S(Record.act_email).isEmpty()) record.act_email = Record.act_email;
                if (!S(Record.act_role).isEmpty()) record.act_role = Record.act_role;
                if (!S(Record.act_status).isEmpty()) record.act_status = Record.act_status;

                    record.save().then(function (record) {
                        reply(null, record);
                    }).catch(function (err) {
                        reply(err);
                    });
                });
            }
            function reply(err, record) {
                if (err) {
                    res.json({
                        code: -1,
                        errors: (err.errors && err.errors.length > 0) ? err.errors : [{message: err.message || err}]
                    });
                } else {
                    res.json({
                        "code": 0,
                        "account": record
                    });
                }
            }
        });

    // Delete a Account
    router.delete('/:id',
        app.requirePermission([
            ['allow', {
                users:['@'],
                roles: ['super-admin', 'admin']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function (req, res) {
            app.models["Account"].find({
                "where":{
                    "act_id": req.params.id
                }
            }).then(function(record) {
                if (record) {
                    if (app.requirePermission.roles('allow', ['super-admin']).check(req.account)) {
                        // super-admin has all permissions
                    } else {
                        if (app.requirePermission.roles('allow', ['super-admin']).check(record)) {
                            return res.json({
                                code: -1,
                                errors: [{message: req.translate('system', 'You do not have permissions delete this user.')}]
                            });
                        }
                    }
                    record.destroy();
                }

                res.json({
                    message: req.translate('system', '__MODEL__ successfully deleted', {__MODEL__: 'Account'})
                });
            });
        });
}
