/**
 * This is the model class for table "country".
 */
'use strict';
var Sequelize = require('sequelize'),
    sequelize = global.sequelize,
    crypt = require('password-hash');

module.exports = function (app) {
    if (!sequelize.isDefined('Country')) {
        var schema = {
            // List of 'Country' fields 
            cty_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                defaultValue: 0,
                validate: {
                }
            },
            cty_name: {
                type: Sequelize.STRING,
                unique: true,
                defaultValue: "",
                validate: {
                }
            },
            cty_iso_code_2: {
                type: Sequelize.STRING(2),
                unique: true,
                defaultValue: "",
                validate: {
                }
            },
            cty_iso_code_3: {
                type: Sequelize.STRING(3),
                unique: true,
                defaultValue: "",
                validate: {
                }
            },
            cty_status: {
                type: Sequelize.ENUM('draft','online','delete'),
                defaultValue: "draft",
                validate: {
                }
            }
        };

        app.models.Country = sequelize.define('Country', schema, {
            // Define model options 
            timestamps: false,
            freezeTableName: true,
            tableName: 'country',
            instanceMethods: {
            }
        });

        // List of required models 

        // Define relations of this model 
    }
};
