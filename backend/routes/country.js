/**
 * This is the controller for table "Country".
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
    app.use('/country', router);

    // List All models of Country
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
                Query = cookie.get("Country_query"),
                limit = req.query.limit || 25,
                page = req.query.page || 1,
                sort = req.query["Country_sort"],
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
                cookie.set("Country_query", encodeURIComponent(JSON.stringify(Query)));
            }

            // Add filters 
            if (!S(Query.cty_name).isEmpty()) query.where.cty_name = {like:Query.cty_name + '%'};
            if (!S(Query.cty_iso_code_2).isEmpty()) query.where.cty_iso_code_2 = {like:Query.cty_iso_code_2 + '%'};
            if (!S(Query.cty_iso_code_3).isEmpty()) query.where.cty_iso_code_3 = {like:Query.cty_iso_code_3 + '%'};
            if (!S(Query.cty_status).isEmpty()) query.where.cty_status = Query.cty_status;

            app.models["Country"].findAndCountAll(query).then(function (result) {
                res.render('country/index', {
                    "breadcrumbs": [
                        {"label": req.translate('country', 'title'), "url": '/country'}
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

    // Render form for create a Country
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
            res.render('country/create', {
                "breadcrumbs": [
                    {"label": req.translate('country', 'title'), "url": '/country'},
                    {"label": req.translate('system', 'Create')}
                ],
                "country": app.models["Country"].build({})
            });
        });

    // Render form for update a Country
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
                    "cty_id": req.params.id
                },
                include: []
            };

            // Add relations 

            app.models["Country"].find(query).then(function (result) {
                if (!result) return res.redirect('/country');

                res.render('country/update', {
                    "breadcrumbs": [
                        {"label": req.translate('country', 'title'), "url": '/country'},
                        {"label": req.params.id + ' - ' + req.translate('system', 'Update')}
                    ],
                    "country": result
                });
            });
        });
}

function initApis(app) {
    var router = express.Router();
    app.use('/api/country', router);

    // List All models of Country
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

            app.models["Country"].findAll(query).then(function(results) {
                res.json(results);
            });
        });

    // Create / Update a Country
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

            if (!Record["cty_id"])
                return createRecord();
            return updateRecord();

            function createRecord() {
                var record = app.models["Country"].build({});

                // Add fields 
                if (!S(Record.cty_name).isEmpty()) record.cty_name = Record.cty_name;
                if (!S(Record.cty_iso_code_2).isEmpty()) record.cty_iso_code_2 = Record.cty_iso_code_2;
                if (!S(Record.cty_iso_code_3).isEmpty()) record.cty_iso_code_3 = Record.cty_iso_code_3;
                if (!S(Record.cty_status).isEmpty()) record.cty_status = Record.cty_status;

                record.save().then(function (record) {
                    reply(null, record);
                }).catch(function (err) {
                    reply(err);
                });
            }
            function updateRecord() {
                app.models["Country"].find({
                    "where":{
                        "cty_id": Record["cty_id"]
                    }
                }).then(function (record) {
                    if (!record) return reply(req.translate('system', 'Record not found'));

                    // Update fields 
                if (!S(Record.cty_name).isEmpty()) record.cty_name = Record.cty_name;
                if (!S(Record.cty_iso_code_2).isEmpty()) record.cty_iso_code_2 = Record.cty_iso_code_2;
                if (!S(Record.cty_iso_code_3).isEmpty()) record.cty_iso_code_3 = Record.cty_iso_code_3;
                if (!S(Record.cty_status).isEmpty()) record.cty_status = Record.cty_status;

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
                        "country": record
                    });
                }
            }
        });

    // Delete a Country
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
            app.models["Country"].find({
                "where":{
                    "cty_id": req.params.id
                }
            }).then(function(record) {
                if (record) {
                    record.destroy();
                }

                res.json({
                    message: req.translate('system', '__MODEL__ successfully deleted', {__MODEL__: 'Country'})
                });
            });
        });
}
