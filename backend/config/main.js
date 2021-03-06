'use strict';
var Sequelize = require('sequelize'),
    extend    = require('deep-extend'),
    logger    = require('../logger');

var config  = {
        db: {
            dbname: "mydb",
            host: "localhost",
            user: "root",
            pw: "",
            port: "3306"
        },
        mailer: {
            transporter: null,
            defaults: {
                from: {
                    name: 'Demo',
                    address: 'demo@domain.com'
                }
            }
        },
        servers: {
            self: {
                protocol: "http",
                host: "demo.com"
            }
        },
        session: {
            secure: false,
            timeout: 3600 * 1000, // 1 hours
            remember: 7 * 24 * 3600 * 1000 // 7 days
        },
        logger: {
            console: {
                enable: false
            },
            file: {
                enable: true,
                filename: 'server'
            }
        }
    },
    configs = {
        prod: {},
        development: {
            servers: {
                self: {
                    protocol: "http",
                    host: false
                }
            },
            logger: {
                console: {
                    enable: true
                },
                file: {
                    enable: true
                }
            }
        }
    };

module.exports = function (options) {
    extend(config, configs[options.env] || configs['development']);

    if (config.servers.self.host === false) {
        config.servers.self.host = 'localhost:' + options.port;
    }
    for (var i in config.servers) {
        if (config.servers.hasOwnProperty(i)) config.servers[i].baseURL = config.servers[i].protocol + '://' + config.servers[i].host;
    }

    config.env = options.env;
    global.logger = logger(config.logger);

    global.sequelize = new Sequelize(config.db.dbname, config.db.user, config.db.pw, {
        host: config.db.host,
        port: config.db.port,
        logging: false
    });

    return config;
};
