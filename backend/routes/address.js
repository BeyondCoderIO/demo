/**
 * This is the controller for table "Address".
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
    app.use('/address', router);

    // List All models of Address
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
                Query = cookie.get("Address_query"),
                limit = req.query.limit || 25,
                page = req.query.page || 1,
                sort = req.query["Address_sort"],
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
                cookie.set("Address_query", encodeURIComponent(JSON.stringify(Query)));
            }

            // Add filters 
            if (!S(Query.add_name).isEmpty()) query.where.add_name = {like:Query.add_name + '%'};
            if (!S(Query.add_category).isEmpty()) query.where.add_category = Query.add_category;
            if (!S(Query.add_status).isEmpty()) query.where.add_status = Query.add_status;
            query.include.push({
                model: app.models.Country,
                as: 'Country',
                where: (S(Query.cty_id).isEmpty()) ? {} : {
                    cty_name: {like: Query.cty_id + '%'}
                },
                required: true
            });

            app.models["Address"].findAndCountAll(query).then(function (result) {
                res.render('address/index', {
                    "breadcrumbs": [
                        {"label": req.translate('address', 'title'), "url": '/address'}
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

    // Render form for create a Address
    router.get('/new',
        app.requirePermission([
            ['allow', {
                users:['@']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function (req, res) {
            res.render('address/create', {
                "breadcrumbs": [
                    {"label": req.translate('address', 'title'), "url": '/address'},
                    {"label": req.translate('system', 'Create')}
                ],
                "address": app.models["Address"].build({})
            });
        });

    // Render form for update a Address
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
                    "add_id": req.params.id
                },
                include: []
            };

            // Add relations 
            query.include.push({
                model: app.models.Country,
                as: 'Country'
            });

            app.models["Address"].find(query).then(function (result) {
                if (!result) return res.redirect('/address');

                res.render('address/update', {
                    "breadcrumbs": [
                        {"label": req.translate('address', 'title'), "url": '/address'},
                        {"label": req.params.id + ' - ' + req.translate('system', 'Update')}
                    ],
                    "address": result
                });
            });
        });
}

function initApis(app) {
    var router = express.Router();
    app.use('/api/address', router);

    // List All models of Address
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

            app.models["Address"].findAll(query).then(function(results) {
                res.json(results);
            });
        });

    // Create / Update a Address
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

            if (!Record["add_id"])
                return createRecord();
            return updateRecord();

            function createRecord() {
                var record = app.models["Address"].build({});

                // Add fields 
                if (!S(Record.add_name).isEmpty()) record.add_name = Record.add_name;
                if (!S(Record.add_address).isEmpty()) record.add_address = Record.add_address;
                if (!S(Record.add_zipcode).isEmpty()) record.add_zipcode = Record.add_zipcode;
                if (!S(Record.add_city).isEmpty()) record.add_city = Record.add_city;
                if (!S(Record.cty_id).isEmpty()) record.cty_id = Record.cty_id;
                if (!S(Record.add_category).isEmpty()) record.add_category = Record.add_category;
                if (!S(Record.add_status).isEmpty()) record.add_status = Record.add_status;

                record.save().then(function (record) {
                    reply(null, record);
                }).catch(function (err) {
                    reply(err);
                });
            }
            function updateRecord() {
                app.models["Address"].find({
                    "where":{
                        "add_id": Record["add_id"]
                    }
                }).then(function (record) {
                    if (!record) return reply(req.translate('system', 'Record not found'));

                    // Update fields 
                if (!S(Record.add_name).isEmpty()) record.add_name = Record.add_name;
                if (!S(Record.add_address).isEmpty()) record.add_address = Record.add_address;
                if (!S(Record.add_zipcode).isEmpty()) record.add_zipcode = Record.add_zipcode;
                if (!S(Record.add_city).isEmpty()) record.add_city = Record.add_city;
                if (!S(Record.cty_id).isEmpty()) record.cty_id = Record.cty_id;
                if (!S(Record.add_category).isEmpty()) record.add_category = Record.add_category;
                if (!S(Record.add_status).isEmpty()) record.add_status = Record.add_status;

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
                        "address": record
                    });
                }
            }
        });

    // Delete a Address
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
            app.models["Address"].find({
                "where":{
                    "add_id": req.params.id
                }
            }).then(function(record) {
                if (record) {
                    record.destroy();
                }

                res.json({
                    message: req.translate('system', '__MODEL__ successfully deleted', {__MODEL__: 'Address'})
                });
            });
        });
}
