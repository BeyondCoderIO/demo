var express = require('express'),
    passport = require('passport'),
    Cookies = require('cookies'),
    logger = global.logger;

module.exports = function (app) {
    var router = express.Router();

    app.use('/', router);

    /**
     * Home
     */
    router.get('/',
        function (req, res, next) {
            if (req.isAuthenticated()) {
                res.render('site/index');
            } else if (req.headers.authorization) {
                passport.authenticate('bearer', {session: false})(req, res, function (err) {
                    if (err) {
                        res.redirect('/login');
                    } else {
                        res.render('site/index');
                    }
                });
            } else {
                res.redirect('/login');
            }
        });

    /**
     * Login
     */
    router.get('/login',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            res.render('site/login', {
                __layout: "layouts/login",
                messages: req.flash('message')
            });
        });

    /**
     * SignUp
     */
    router.get('/signup',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            res.render('site/signup', {
                __layout: "layouts/login",
                messages: req.flash('message')
            });
        });

    /**
     * Logout
     */
    router.get('/logout',
        app.requirePermission([
            ['allow', {
                users: '@' // Connected only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            app.models.AccessToken.destroy({
                where: {
                    atok_id: req.account.accessTokenID
                }
            }).done(function() {
                req.logout();
                res.redirect('/');
            });
        });

    /**
     * Lost password
     */
    router.get('/lostpassword',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            res.render('site/lostpassword', {
                __layout: "layouts/login",
                messages: req.flash('message')
            });
        });

    /**
     * Return json for swagger-ui
     * @see https://github.com/swagger-api/swagger-ui
     */
    router.get('/swagger.json',
        function (req, res) {
            var json = {
                "swagger": "2.0",
                "info": {
                    "title": "APIs",
                    "description": ""
                },
                "host": app.config.servers.self.host,
                "basePath": "/api",
                "schemes": ["http"],
                "tags": [{
                    "name": "Account",
                    "description": ""
                }, {
                    "name": "Address",
                    "description": ""
                }, {
                    "name": "Country",
                    "description": ""
                }],
                "paths": {
                    "/account": {
                        "get": {
                            "tags": ["Account"],
                            "summary": "List all [Account]",
                            "description": "",
                            "operationId": "listAccount",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "limit",
                                "in": "query",
                                "description": "Maximum number of items per page",
                                "required": false,
                                "type": "integer",
                                "default": 25
                            }, {
                                "name": "page",
                                "in": "query",
                                "description": "Requested page",
                                "required": false,
                                "type": "integer",
                                "default": 1
                            }, {
                                "name": "sort",
                                "in": "query",
                                "description": "Sort results by this field",
                                "required": false,
                                "type": "string",
                                "enum": ["act_login", "act_email", "act_role", "act_status"],
                                "default": ""
                            }, {
                                "name": "q[act_login]",
                                "in": "query",
                                "required": false,
                                "type": "string"
                            }, {
                                "name": "q[act_email]",
                                "in": "query",
                                "required": false,
                                "type": "string"
                            }, {
                                "name": "q[act_role]",
                                "in": "query",
                                "required": false,
                                "type": "string",
                                "enum": ["super-admin", "admin", "member"]
                            }, {
                                "name": "q[act_status]",
                                "in": "query",
                                "required": false,
                                "type": "string",
                                "enum": ["waiting", "active", "lock"]
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/account"
                                        }
                                    }
                                }
                            }
                        },
                        "post": {
                            "tags": ["Account"],
                            "summary": "Add a new [Account]",
                            "description": "",
                            "operationId": "addAccount",
                            "consumes": ["application/json"],
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "Account",
                                "in": "body",
                                "description": "",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "act_login": {
                                            "type": "string"
                                        },
                                        "act_password": {
                                            "type": "string"
                                        },
                                        "act_email": {
                                            "type": "string"
                                        },
                                        "act_role": {
                                            "type": "string",
                                            "enum": ["super-admin", "admin", "member"]
                                        },
                                        "act_status": {
                                            "type": "string",
                                            "enum": ["waiting", "active", "lock"]
                                        }
                                    }
                                }
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/account"
                                    }
                                }
                            }
                        },
                        "put": {
                            "tags": ["Account"],
                            "summary": "Update a [Account]",
                            "description": "",
                            "operationId": "updateAccount",
                            "consumes": ["application/json"],
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "Account",
                                "in": "body",
                                "description": "",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "act_id": {
                                            "type": "number"
                                        },
                                        "act_login": {
                                            "type": "string"
                                        },
                                        "act_password": {
                                            "type": "string"
                                        },
                                        "act_email": {
                                            "type": "string"
                                        },
                                        "act_role": {
                                            "type": "string",
                                            "enum": ["super-admin", "admin", "member"]
                                        },
                                        "act_status": {
                                            "type": "string",
                                            "enum": ["waiting", "active", "lock"]
                                        }
                                    }
                                }
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/account"
                                    }
                                }
                            }
                        }
                    },
                    "/account/{accountId}": {
                        "get": {
                            "tags": ["Account"],
                            "summary": "Find [Account] by ID",
                            "description": "",
                            "operationId": "getAccountById",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "accountId",
                                "in": "path",
                                "description": "Id of [Account] to return",
                                "required": true,
                                "type": "number"
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/account"
                                    }
                                }
                            }
                        },
                        "delete": {
                            "tags": ["Account"],
                            "summary": "Delete a [Account]",
                            "description": "",
                            "operationId": "deleteAccount",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "accountId",
                                "in": "path",
                                "description": "Id of [Account] to delete",
                                "required": true,
                                "type": "number"
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/account"
                                    }
                                }
                            }
                        }
                    },
                    "/address": {
                        "get": {
                            "tags": ["Address"],
                            "summary": "List all [Address]",
                            "description": "",
                            "operationId": "listAddress",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "limit",
                                "in": "query",
                                "description": "Maximum number of items per page",
                                "required": false,
                                "type": "integer",
                                "default": 25
                            }, {
                                "name": "page",
                                "in": "query",
                                "description": "Requested page",
                                "required": false,
                                "type": "integer",
                                "default": 1
                            }, {
                                "name": "sort",
                                "in": "query",
                                "description": "Sort results by this field",
                                "required": false,
                                "type": "string",
                                "enum": ["add_name", "add_address", "add_zipcode", "add_city", "add_category", "add_status"],
                                "default": ""
                            }, {
                                "name": "q[add_name]",
                                "in": "query",
                                "required": false,
                                "type": "string"
                            }, {
                                "name": "q[add_zipcode]",
                                "in": "query",
                                "required": false,
                                "type": "string"
                            }, {
                                "name": "q[add_city]",
                                "in": "query",
                                "required": false,
                                "type": "string"
                            }, {
                                "name": "q[add_category]",
                                "in": "query",
                                "required": false,
                                "type": "string",
                                "enum": ["Personal", "Familly", "Job", "Friend", "Blocked"]
                            }, {
                                "name": "q[add_status]",
                                "in": "query",
                                "required": false,
                                "type": "string",
                                "enum": ["draft", "online", "delete"]
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/address"
                                        }
                                    }
                                }
                            }
                        },
                        "post": {
                            "tags": ["Address"],
                            "summary": "Add a new [Address]",
                            "description": "",
                            "operationId": "addAddress",
                            "consumes": ["application/json"],
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "Address",
                                "in": "body",
                                "description": "",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "add_name": {
                                            "type": "string"
                                        },
                                        "add_address": {
                                            "type": "string"
                                        },
                                        "add_zipcode": {
                                            "type": "string"
                                        },
                                        "add_city": {
                                            "type": "string"
                                        },
                                        "cty_id": {
                                            "type": "number"
                                        },
                                        "add_category": {
                                            "type": "string"
                                        },
                                        "add_latitude": {
                                            "type": "number"
                                        },
                                        "add_longitude": {
                                            "type": "number"
                                        },
                                        "add_status": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/address"
                                    }
                                }
                            }
                        },
                        "put": {
                            "tags": ["Address"],
                            "summary": "Update a [Address]",
                            "description": "",
                            "operationId": "updateAddress",
                            "consumes": ["application/json"],
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "Address",
                                "in": "body",
                                "description": "",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "add_id": {
                                            "type": "number"
                                        },
                                        "add_name": {
                                            "type": "string"
                                        },
                                        "add_address": {
                                            "type": "string"
                                        },
                                        "add_zipcode": {
                                            "type": "string"
                                        },
                                        "add_city": {
                                            "type": "string"
                                        },
                                        "cty_id": {
                                            "type": "number"
                                        },
                                        "add_category": {
                                            "type": "string"
                                        },
                                        "add_latitude": {
                                            "type": "number"
                                        },
                                        "add_longitude": {
                                            "type": "number"
                                        },
                                        "add_status": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/address"
                                    }
                                }
                            }
                        }
                    },
                    "/address/{addressId}": {
                        "get": {
                            "tags": ["Address"],
                            "summary": "Find [Address] by ID",
                            "description": "",
                            "operationId": "getAddressById",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "addressId",
                                "in": "path",
                                "description": "Id of [Address] to return",
                                "required": true,
                                "type": "number"
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/address"
                                    }
                                }
                            }
                        },
                        "delete": {
                            "tags": ["Address"],
                            "summary": "Delete a [Address]",
                            "description": "",
                            "operationId": "deleteAddress",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "addressId",
                                "in": "path",
                                "description": "Id of [Address] to delete",
                                "required": true,
                                "type": "number"
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/address"
                                    }
                                }
                            }
                        }
                    },
                    "/country": {
                        "get": {
                            "tags": ["Country"],
                            "summary": "List all [Country]",
                            "description": "",
                            "operationId": "listCountry",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "limit",
                                "in": "query",
                                "description": "Maximum number of items per page",
                                "required": false,
                                "type": "integer",
                                "default": 25
                            }, {
                                "name": "page",
                                "in": "query",
                                "description": "Requested page",
                                "required": false,
                                "type": "integer",
                                "default": 1
                            }, {
                                "name": "sort",
                                "in": "query",
                                "description": "Sort results by this field",
                                "required": false,
                                "type": "string",
                                "enum": ["cty_name", "cty_iso_code_2", "cty_iso_code_3", "cty_status"],
                                "default": ""
                            }, {
                                "name": "q[cty_name]",
                                "in": "query",
                                "required": false,
                                "type": "string"
                            }, {
                                "name": "q[cty_status]",
                                "in": "query",
                                "required": false,
                                "type": "string",
                                "enum": ["draft", "online", "delete"]
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/country"
                                        }
                                    }
                                }
                            }
                        },
                        "post": {
                            "tags": ["Country"],
                            "summary": "Add a new [Country]",
                            "description": "",
                            "operationId": "addCountry",
                            "consumes": ["application/json"],
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "Country",
                                "in": "body",
                                "description": "",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "cty_name": {
                                            "type": "string"
                                        },
                                        "cty_iso_code_2": {
                                            "type": "string"
                                        },
                                        "cty_iso_code_3": {
                                            "type": "string"
                                        },
                                        "cty_status": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/country"
                                    }
                                }
                            }
                        },
                        "put": {
                            "tags": ["Country"],
                            "summary": "Update a [Country]",
                            "description": "",
                            "operationId": "updateCountry",
                            "consumes": ["application/json"],
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "Country",
                                "in": "body",
                                "description": "",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "cty_id": {
                                            "type": "number"
                                        },
                                        "cty_name": {
                                            "type": "string"
                                        },
                                        "cty_iso_code_2": {
                                            "type": "string"
                                        },
                                        "cty_iso_code_3": {
                                            "type": "string"
                                        },
                                        "cty_status": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/country"
                                    }
                                }
                            }
                        }
                    },
                    "/country/{countryId}": {
                        "get": {
                            "tags": ["Country"],
                            "summary": "Find [Country] by ID",
                            "description": "",
                            "operationId": "getCountryById",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "countryId",
                                "in": "path",
                                "description": "Id of [Country] to return",
                                "required": true,
                                "type": "number"
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/country"
                                    }
                                }
                            }
                        },
                        "delete": {
                            "tags": ["Country"],
                            "summary": "Delete a [Country]",
                            "description": "",
                            "operationId": "deleteCountry",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "countryId",
                                "in": "path",
                                "description": "Id of [Country] to delete",
                                "required": true,
                                "type": "number"
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/country"
                                    }
                                }
                            }
                        }
                    }
                },
                "definitions": {
                    "account": {
                        "type": "object",
                        "properties": {
                            "act_id": {
                                "type": "number"
                            },
                            "act_login": {
                                "type": "string"
                            },
                            "act_email": {
                                "type": "string"
                            },
                            "act_role": {
                                "type": "string",
                                "enum": ["super-admin", "admin", "member"]
                            },
                            "act_status": {
                                "type": "string",
                                "enum": ["waiting", "active", "lock"]
                            }
                        }
                    },
                    "address": {
                        "type": "object",
                        "properties": {
                            "add_id": {
                                "type": "number"
                            },
                            "add_name": {
                                "type": "string"
                            },
                            "add_address": {
                                "type": "string"
                            },
                            "add_zipcode": {
                                "type": "string"
                            },
                            "add_city": {
                                "type": "string"
                            },
                            "cty_id": {
                                "type": "number"
                            },
                            "add_category": {
                                "type": "string",
                                "enum": ["Personal", "Familly", "Job", "Friend", "Blocked"]
                            },
                            "add_latitude": {
                                "type": "number"
                            },
                            "add_longitude": {
                                "type": "number"
                            },
                            "add_status": {
                                "type": "string",
                                "enum": ["draft", "online", "delete"]
                            }
                        }
                    },
                    "country": {
                        "type": "object",
                        "properties": {
                            "cty_id": {
                                "type": "number"
                            },
                            "cty_name": {
                                "type": "string"
                            },
                            "cty_iso_code_2": {
                                "type": "string"
                            },
                            "cty_iso_code_3": {
                                "type": "string"
                            },
                            "cty_status": {
                                "type": "string",
                                "enum": ["draft", "online", "delete"]
                            }
                        }
                    }
                }
            };
            res.json(json);
        });
};
