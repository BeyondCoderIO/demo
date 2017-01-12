/**
 * This is the controller for table "Country".
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
    app.use('/api/country', router);

    // List All [Country]
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
            if (!S(Query.cty_name).isEmpty()) query.where.cty_name = {like: Query.cty_name + '%'};
            if (!S(Query.cty_status).isEmpty()) query.where.cty_status = Query.cty_status;

            app.models.Country.findAndCountAll(query).then(function (result) {
                res.json({
                    "rows": result.rows,
                    "count": result.count
                });
            });
        });

    // Find [Country] by ID
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
                    "cty_id": req.params.id
                },
                include: []
            };

            app.models.Country.find(query).then(function (result) {
                if (!result) return res.status(404).end();

                res.json(screen(result, {
                    "cty_id": "number",
                    "cty_name": "string",
                    "cty_iso_code_2": "string",
                    "cty_iso_code_3": "string",
                    "cty_status": "string"
                }));
            });
        });

    // Add a new [Country]
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
            var Record = req.body,
                record = app.models.Country.build({
                });

            if (!S(Record.cty_name).isEmpty()) record.cty_name = Record.cty_name;
            if (!S(Record.cty_iso_code_2).isEmpty()) record.cty_iso_code_2 = Record.cty_iso_code_2;
            if (!S(Record.cty_iso_code_3).isEmpty()) record.cty_iso_code_3 = Record.cty_iso_code_3;
            if (!S(Record.cty_status).isEmpty()) record.cty_status = Record.cty_status;

            record.save().then(function (record) {
                res.json(screen(record, {
                    "cty_id": "number",
                    "cty_name": "string",
                    "cty_iso_code_2": "string",
                    "cty_iso_code_3": "string",
                    "cty_status": "string"
                }));
            }).catch(function (err) {
                logger.error(err);
                res.status(400).json({
                    error: err
                });
            });
        });

    // Update a [Country]
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

            app.models.Country.find({
                where: {
                    "cty_id": Record["cty_id"]
                }
            }).then(function(record) {
                if (!record) return res.status(404).end();

                if (!S(Record.cty_name).isEmpty()) record.cty_name = Record.cty_name;
                if (!S(Record.cty_iso_code_2).isEmpty()) record.cty_iso_code_2 = Record.cty_iso_code_2;
                if (!S(Record.cty_iso_code_3).isEmpty()) record.cty_iso_code_3 = Record.cty_iso_code_3;
                if (!S(Record.cty_status).isEmpty()) record.cty_status = Record.cty_status;

                return record.save().then(function (record) {
                    res.json(screen(record, {
                        "cty_id": "number",
                        "cty_name": "string",
                        "cty_iso_code_2": "string",
                        "cty_iso_code_3": "string",
                        "cty_status": "string"
                    }));
                })
            }).catch(function (err) {
                logger.error(err);
                res.status(400).json({
                    error: err
                });
            });
        });

    // Delete a [Country]
    router.delete('/:id',
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
                    "cty_id": req.params.id
                }
            };

            app.models.Country.find(query).then(function (record) {
                if (!record) return res.status(404).end();
                record.destroy();

                res.json(screen(record, {
                    "cty_id": "number",
                    "cty_name": "string",
                    "cty_iso_code_2": "string",
                    "cty_iso_code_3": "string",
                    "cty_status": "string"
                }));
            });
        });
};
