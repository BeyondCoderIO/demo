                   ____  _______   _____  _   _ ____        ____ ___  ____  _____ ____
                  | __ )| ____\ \ / / _ \| \ | |  _ \      / ___/ _ \|  _ \| ____|  _ \
                  |  _ \|  _|  \ V / | | |  \| | | | |    | |  | | | | | | |  _| | |_) |
                  | |_) | |___  | || |_| | |\  | |_| |    | |__| |_| | |_| | |___|  _ <
                  |____/|_____| |_| \___/|_| \_|____/      \____\___/|____/|_____|_| \_\

              _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____
             |_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|
             |_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|_____|
                               ____  _____    _    ____  __  __ _____
                              |  _ \| ____|  / \  |  _ \|  \/  | ____|
                              | |_) |  _|   / _ \ | | | | |\/| |  _|
                              |  _ <| |___ / ___ \| |_| | |  | | |___
                              |_| \_\_____/_/   \_\____/|_|  |_|_____|

                               Beyond Coder v3.0

Welcome, you just used Beyond Coder v3.0 for generate
APIs under node.js with MySQL type of database.


Main files
----------
backend
|_ config
| |_ main.js                  Configuration file of your project
|_ data
| |_ mysql-data.sql           File containing data to initialize your database.
|_ i18n                       Language folder to develop a multi-lingual app.
|_ models                     Folder containing all your models tables.
| |_ AccessToken.js           Your application is pre-configured to manage user account login system with access tokens.
| |_ Account.js
| |_ Address.js
| |_ Country.js
|_ passport                   Your application use passportjs (see http://passportjs.org/) for authentication
| |_ local.js                 Passport strategy for authenticating with a username and password. (see https://github.com/jaredhanson/passport-local)
| |_ bearer.js                HTTP Bearer authentication strategy for Passport. (see https://github.com/jaredhanson/passport-http-bearer)
|_ routes                     Folder containing various routing files from your application.
| |_ index.js                 Routes entries your application (eg, login, logout, lostpassword, etc.)
| |_ account.js
| |_ address.js
| |_ country.js
|_ views                      Folder containing the views of your application.
| |_ site
| | |_ index.ejs              This view list all APIs with Swagger-UI.
| | |_ login.ejs              This view is the view for login.
| | |_ lostpassword.ejs       This view is the view in case of forgotten password.
| | |_ newpassword.ejs        This view is the view to choose a new password after you make a forgotten password request.
| | |_ signup.ejs             This view is the view for sign-up.
|_ server.js                  File server to start your application. It automagically load all your models and all your routes.
|_ logger.js                  A logger has been preconfigured to manage your logs depending on their type (debug, info, error).
|_ package.json
|_ permissionRules.js         This module was developed by the Beyond team to manage access rights to your routes based on the role, the IP, the user name, etc.
|_ translate.js               This module was developed by the Beyond team to manage multi-language with a function: function translate(category = 'category', message = 'Message __PARAM__', params = {__PARAM__: 'parameter'})
|_ README.txt


Requirements
------------
1. node.js
2. npm
3. A running MySQL (or SQL) database server.
4. (optional) forever (if not installed, use the command: npm install -g forever).


Installation
------------
1. Use the command: "npm install" on your terminal console inside your root project.
2. Install the SQL Script into your database server (see api/data/mysql-data.sql).
3. Update the config file to access your database (see api/config/main.js)
4. To start your server, use the command line:
   - with "node"   : node server.js port=8000
   - with "forever": forever start server.js port=8000
5. Launch your browser and to to URL: http://localhost:8000
6. Enjoy !!!!


Tutorial - module Permissions
-----------------------------
An object with a function to be added to the app object: app.requirePermission

/**
 * This function takes the rules of permission and returns a function to call to test if the user has required permissions.
 *
 * @param array rule - Rules describing the permissions can be a rule or an array of rules.
 * If an array of rules is given, the tests are stopped at the first rule that matches the connected user.
 * Please note if no rules match the connected user, the user will have access. It is therefore recommended to finish with a rule that matches all users.
 *
 * ex:
 * function([
 *   ['allow',
 *     {
 *       roles: ['super-admin', 'admin'],
 *       users: ['nom', '@', '?', '*'], // @ = member (connected), ? = guest (not connected), * = anyone
 *       ips: ['192.168.0.1', '192.168.0.*', '192.168.*', '*'], // 192.168.0.* = all ips starting by 192.168.0., * = all ips
 *       expression: "account.act_email == 'contact@domain.com'" // must return 'true' for match
 *     } // If all the rules above match, the user has the permission to access.
 *   ],
 *   ['deny',
 *     {
 *       users:'*'
 *     }
 *   ]
 * ])
 *
 * @return [function] - Function to call to test if the user has permissions required.
 * This function can be called in 2 ways :
 * function(req, res, next) - If the user has the permissions next() is called, otherwise res.sendStatus(403) is called.
 * function(req, next) - If the user has the permissions next() is called, otherwise next(deny) is called.
 */
app.requirePermission(rules)

If just one type of rule you want, you can use it directly. examples:

app.requirePermission.roles([
  ['allow', ['super-admin', 'admin']],
  ['deny', 'guest'],
])
app.requirePermission.users([
  ['allow', '@'],
  ['deny', '*']
])
app.requirePermission.ips([
  ['allow', 'localhost'],
  ['deny', '*']
])
app.requirePermission.expression(['deny', "account.act_login != admin"])


Problems?
---------
#####


Enjoy !

The Beyond Coder team