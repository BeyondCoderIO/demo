/**
 * This is the model class for table "account".
 */
'use strict';
var Sequelize = require('sequelize'),
    sequelize = global.sequelize,
    crypt = require('password-hash');

module.exports = function (app) {
    if (!sequelize.isDefined('Account')) {
        var schema = {
            // List of 'Account' fields 
            act_id: {
                type: Sequelize.INTEGER(11),
                primaryKey: true,
                autoIncrement: true,
                validate: {
                }
            },
            act_login: {
                type: Sequelize.STRING(255),
                allowNull: true,
                validate: {
                }
            },
            act_password: {
                type: Sequelize.STRING(255),
                allowNull: true,
                set: function (password) {
                    if (password) {
                        this.setDataValue('act_password', crypt.generate(password));
                    }
                },
                validate: {
                }
            },
            act_email: {
                type: Sequelize.STRING(255),
                allowNull: true,
                validate: {
                    isEmail: true
                }
            },
            act_role: {
                type: Sequelize.ENUM('super-admin', 'admin', 'member'),
                defaultValue: "member",
                validate: {
                }
            },
            act_insert: {
                type: Sequelize.DATE,
                allowNull: true,
                validate: {
                }
            },
            act_update: {
                type: Sequelize.DATE,
                allowNull: true,
                validate: {
                }
            },
            act_status: {
                type: Sequelize.ENUM('waiting','active','lock'),
                defaultValue: "active",
                validate: {
                }
            }
        };

        app.models.Account = sequelize.define('Account', schema, {
            // Define model options 
            timestamps: true,
            createdAt: 'act_insert',
            updatedAt: 'act_update',
            freezeTableName: true,
            tableName: 'account',
            instanceMethods: {
                validatePassword: function (password) {
                    return crypt.verify(password, this.act_password);
                }
            }
        });

        // List of required models 

        // Define relations of this model 
    }
};
