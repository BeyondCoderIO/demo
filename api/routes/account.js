/**
 * This is the controller for table "Account".
 */
'use strict';
var express = require('express'),
    async   = require('async'),
    Cookies = require('cookies'),
    S       = require('string'),
    screen  = require('screener').screen,
    logger  = global.logger;

module.exports = function (app) {
    var router = express.Router();
    app.use('/api/account', router);

    // List All [Account]
    router.get('/',
        app.requirePermission([
            ['allow', {
                users: ['@']
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            var limit = parseInt(req.query.limit || 25),
                page = parseInt(req.query.page || 1),
                sort = req.query.sort || '',
                Query = req.query.q || {},
                query = {
                    where: {},
                    include: [],
                    offset: (page - 1) * limit,
                    limit: limit,
                    order: sort
                };

            // Add filters
            if (!S(Query.act_login).isEmpty()) query.where.act_login = {like: Query.act_login + '%'};
            if (!S(Query.act_email).isEmpty()) query.where.act_email = {like: Query.act_email + '%'};
            if (!S(Query.act_role).isEmpty()) query.where.act_role = Query.act_role;
            if (!S(Query.act_status).isEmpty()) query.where.act_status = Query.act_status;

            app.models.Account.findAndCountAll(query).then(function (result) {
                res.json({
                    "rows": result.rows,
                    "count": result.count
                });
            });
        });

    // Find [Account] by ID
    router.get('/:id',
        app.requirePermission([
            ['allow', {
                users: ['@']
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            var query = {
                where: {
                    "act_id": req.params.id
                },
                include: []
            };

            app.models.Account.find(query).then(function (result) {
                if (!result) return res.status(404).end();

                res.json(screen(result, {
                    "act_id": "number",
                    "act_login": "string",
                    "act_email": "string",
                    "act_role": "string",
                    "act_status": "string"
                }));
            });
        });

    // Add a new [Account]
    router.post('/',
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
            var Record = req.body,
                record = app.models.Account.build({
                });

            if (!S(Record.act_login).isEmpty()) record.act_login = Record.act_login;
            if (!S(Record.act_password).isEmpty()) record.act_password = Record.act_password;
            if (!S(Record.act_email).isEmpty()) record.act_email = Record.act_email;
            if (!S(Record.act_role).isEmpty()) record.act_role = Record.act_role;
            if (!S(Record.act_status).isEmpty()) record.act_status = Record.act_status;

            record.save().then(function (record) {
                res.json(screen(record, {
                    "act_id": "number",
                    "act_login": "string",
                    "act_email": "string",
                    "act_role": "string",
                    "act_status": "string"
                }));
            }).catch(function (err) {
                logger.error(err);
                res.status(400).json({
                    error: err
                });
            });
        });

    // Update a [Account]
    router.put('/',
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

            app.models.Account.find({
                where: {
                    "act_id": Record["act_id"]
                }
            }).then(function(record) {
                if (!record) return res.status(404).end();
                if (app.requirePermission.roles('allow', ['super-admin']).check(req.account)) {
                    // super-admin has all permissions
                } else if (app.requirePermission.roles('allow', ['admin']).check(req.account)) {
                    if (app.requirePermission.roles('allow', ['super-admin']).check(record)) {
                        return res.status(400).end(req.translate('system', 'You do not have permissions update this user.'));
                    }
                } else if (req.account['act_id'] != record['act_id']) {
                    return res.status(400).end(req.translate('system', 'You do not have permissions update this user.'))
                }

                if (!S(Record.act_login).isEmpty()) record.act_login = Record.act_login;
                if (!S(Record.act_password).isEmpty()) record.act_password = Record.act_password;
                if (!S(Record.act_email).isEmpty()) record.act_email = Record.act_email;
                if (!S(Record.act_role).isEmpty()) record.act_role = Record.act_role;
                if (!S(Record.act_status).isEmpty()) record.act_status = Record.act_status;

                return record.save().then(function (record) {
                    res.json(screen(record, {
                        "act_id": "number",
                        "act_login": "string",
                        "act_email": "string",
                        "act_role": "string",
                        "act_status": "string"
                    }));
                })
            }).catch(function (err) {
                logger.error(err);
                res.status(400).json({
                    error: err
                });
            });
        });

    // Delete a [Account]
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
            var query = {
                where: {
                    "act_id": req.params.id
                }
            };

            app.models.Account.find(query).then(function (record) {
                if (!record) return res.status(404).end();
                record.destroy();
                if (app.requirePermission.roles('allow', ['super-admin']).check(req.account)) {
                    // super-admin has all permissions
                } else if (app.requirePermission.roles('allow', ['super-admin']).check(record)) {
                    return res.status(400).end(req.translate('system', 'You do not have permissions delete this user.'));
                }

                res.json(screen(record, {
                    "act_id": "number",
                    "act_login": "string",
                    "act_email": "string",
                    "act_role": "string",
                    "act_status": "string"
                }));
            });
        });
};
