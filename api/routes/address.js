/**
 * This is the controller for table "Address".
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
    app.use('/api/address', router);

    // List All [Address]
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
            if (!S(Query.add_name).isEmpty()) query.where.add_name = {like: Query.add_name + '%'};
            if (!S(Query.add_zipcode).isEmpty()) query.where.add_zipcode = {like: Query.add_zipcode + '%'};
            if (!S(Query.add_city).isEmpty()) query.where.add_city = {like: Query.add_city + '%'};
            if (!S(Query.add_category).isEmpty()) query.where.add_category = Query.add_category;
            if (!S(Query.add_status).isEmpty()) query.where.add_status = Query.add_status;

            app.models.Address.findAndCountAll(query).then(function (result) {
                res.json({
                    "rows": result.rows,
                    "count": result.count
                });
            });
        });

    // Find [Address] by ID
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
                    "add_id": req.params.id
                },
                include: []
            };

            app.models.Address.find(query).then(function (result) {
                if (!result) return res.status(404).end();

                res.json(screen(result, {
                    "add_id": "number",
                    "add_name": "string",
                    "add_address": "string",
                    "add_zipcode": "string",
                    "add_city": "string",
                    "cty_id": "number",
                    "add_category": "string",
                    "add_latitude": "number",
                    "add_longitude": "number",
                    "add_status": "string"
                }));
            });
        });

    // Add a new [Address]
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
                record = app.models.Address.build({
                });

            if (!S(Record.add_name).isEmpty()) record.add_name = Record.add_name;
            if (!S(Record.add_address).isEmpty()) record.add_address = Record.add_address;
            if (!S(Record.add_zipcode).isEmpty()) record.add_zipcode = Record.add_zipcode;
            if (!S(Record.add_city).isEmpty()) record.add_city = Record.add_city;
            if (!S(Record.cty_id).isEmpty()) record.cty_id = Record.cty_id;
            if (!S(Record.add_category).isEmpty()) record.add_category = Record.add_category;
            if (!S(Record.add_latitude).isEmpty()) record.add_latitude = Record.add_latitude;
            if (!S(Record.add_longitude).isEmpty()) record.add_longitude = Record.add_longitude;
            if (!S(Record.add_status).isEmpty()) record.add_status = Record.add_status;

            record.save().then(function (record) {
                res.json(screen(record, {
                    "add_id": "number",
                    "add_name": "string",
                    "add_address": "string",
                    "add_zipcode": "string",
                    "add_city": "string",
                    "cty_id": "number",
                    "add_category": "string",
                    "add_latitude": "number",
                    "add_longitude": "number",
                    "add_status": "string"
                }));
            }).catch(function (err) {
                logger.error(err);
                res.status(400).json({
                    error: err
                });
            });
        });

    // Update a [Address]
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

            app.models.Address.find({
                where: {
                    "add_id": Record["add_id"]
                }
            }).then(function(record) {
                if (!record) return res.status(404).end();

                if (!S(Record.add_name).isEmpty()) record.add_name = Record.add_name;
                if (!S(Record.add_address).isEmpty()) record.add_address = Record.add_address;
                if (!S(Record.add_zipcode).isEmpty()) record.add_zipcode = Record.add_zipcode;
                if (!S(Record.add_city).isEmpty()) record.add_city = Record.add_city;
                if (!S(Record.cty_id).isEmpty()) record.cty_id = Record.cty_id;
                if (!S(Record.add_category).isEmpty()) record.add_category = Record.add_category;
                if (!S(Record.add_latitude).isEmpty()) record.add_latitude = Record.add_latitude;
                if (!S(Record.add_longitude).isEmpty()) record.add_longitude = Record.add_longitude;
                if (!S(Record.add_status).isEmpty()) record.add_status = Record.add_status;

                return record.save().then(function (record) {
                    res.json(screen(record, {
                        "add_id": "number",
                        "add_name": "string",
                        "add_address": "string",
                        "add_zipcode": "string",
                        "add_city": "string",
                        "cty_id": "number",
                        "add_category": "string",
                        "add_latitude": "number",
                        "add_longitude": "number",
                        "add_status": "string"
                    }));
                })
            }).catch(function (err) {
                logger.error(err);
                res.status(400).json({
                    error: err
                });
            });
        });

    // Delete a [Address]
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
                    "add_id": req.params.id
                }
            };

            app.models.Address.find(query).then(function (record) {
                if (!record) return res.status(404).end();
                record.destroy();

                res.json(screen(record, {
                    "add_id": "number",
                    "add_name": "string",
                    "add_address": "string",
                    "add_zipcode": "string",
                    "add_city": "string",
                    "cty_id": "number",
                    "add_category": "string",
                    "add_latitude": "number",
                    "add_longitude": "number",
                    "add_status": "string"
                }));
            });
        });
};
