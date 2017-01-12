/**
 * This is the model class for table "address".
 */
'use strict';
var Sequelize = require('sequelize'),
    sequelize = global.sequelize,
    crypt = require('password-hash');

module.exports = function (app) {
    if (!sequelize.isDefined('Address')) {
        var schema = {
            // List of 'Address' fields 
            add_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                defaultValue: 0,
                validate: {
                }
            },
            add_name: {
                type: Sequelize.STRING,
                defaultValue: "",
                validate: {
                }
            },
            add_address: {
                type: Sequelize.STRING,
                defaultValue: "",
                validate: {
                }
            },
            add_zipcode: {
                type: Sequelize.STRING,
                defaultValue: "",
                validate: {
                }
            },
            add_city: {
                type: Sequelize.STRING,
                defaultValue: "",
                validate: {
                }
            },
            cty_id: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                validate: {
                }
            },
            add_category: {
                type: Sequelize.ENUM('Personal','Familly','Job','Friend','Blocked'),
                defaultValue: "Personal",
                validate: {
                }
            },
            add_latitude: {
                type: Sequelize.DOUBLE(7, 5),
                defaultValue: 0,
                validate: {
                }
            },
            add_longitude: {
                type: Sequelize.DOUBLE(8, 5),
                defaultValue: 0,
                validate: {
                }
            },
            add_insert: {
                type: Sequelize.DATE,
                defaultValue: 0,
                validate: {
                }
            },
            add_update: {
                type: Sequelize.DATE,
                defaultValue: 0,
                validate: {
                }
            },
            add_status: {
                type: Sequelize.ENUM('draft','online','delete'),
                defaultValue: "draft",
                validate: {
                }
            }
        };

        app.models.Address = sequelize.define('Address', schema, {
            // Define model options 
            timestamps: true,
            createdAt: 'add_insert',
            updatedAt: 'add_update',
            freezeTableName: true,
            tableName: 'address',
            instanceMethods: {
            }
        });

        // List of required models 
        require('./Country')(app);

        // Define relations of this model 
        app.models.Address.belongsTo(app.models.Country, {
            foreignKey: 'cty_id',
            targetKey: 'cty_id',
            as: 'Country'
        });
    }
};
