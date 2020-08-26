/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */

const Route = use('Route');

/**
 * @api {post} /auth/register Registers a new user
 * @apiGroup Auth
 * @apiParam {String} [scope] Optional For send confirmation email.
 * @apiParam {String} full_name Mandatory if first_name is not provided.
 * @apiParam {String} first_name Mandatory if full_name is not provided.
 * @apiParam {String} [last_name] Optional LastName.
 * @apiParam {String} email Mandatory User Email.
 * @apiParam {String} password Mandatory User Password.
 * @apiParamExample {json} Request sample:
 *{
 *      "scope": "admin"
 *      "first_name":"FirstName",
 *      "last_name":"LastName",
 *      "email": "user@testing.com",
 *      "password": "pass"
 *    }
 * @apiSuccess {String} first_name User First Name
 * @apiSuccess {String} last_name User Last Name
 * @apiSuccess {String} email User Email
 * @apiSuccess {Date} created_at User Register date
 * @apiSuccess {Date} updated_at User Update date
 * @apiSuccess {Number} id User Id
 * @apiSuccess {Number} role_id User Role Id
 * @apiSuccess {String} full_name User Full Name
 * @apiSuccess {object} role User Role object
 * @apiSuccess {number} role.id User Role id
 * @apiSuccess {number} role.role User Role
 * @apiSuccess {number} role.description User Role Description
 * @apiSuccess {number} role.created_at Role Register date
 * @apiSuccess {number} role.updated_at Role Update date
 * @apiSuccess {String} password Empty password
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"first_name": "FirstName",
 * 		"last_name": "LastName",
 * 		"email": "user@testing.com",
 * 		"created_at": "2020-07-31 15:39:02",
 * 		"updated_at": "2020-07-31 15:39:02",
 * 		"id": 1,
 * 		"role_id": 1,
 * 		"full_name": "FirstName LastName",
 *		 "role": {
 *			"id": 1,
 *			"role": "DEFAULT_USER",
 *			"description": "Usuário comum",
 *			"created_at": "2020-07-31 19:10:52",
 *			"updated_at": "2020-07-31 19:10:52"
 * 		},
 * 		"password": ""
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
Route.post('/auth/register', 'AuthController.register').validator('User');

/**
 * @api {post} /auth/login Authenticates a user
 * @apiGroup Auth
 * @apiParam {String} email Mandatory User Email.
 * @apiParam {String} password Mandatory User Password.
 * @apiParamExample {json} Request sample:
 *    {
 *		"email": "user@testing.com",
 *		"password": "pass"
 *    }
 * @apiSuccess {String} type Token Type
 * @apiSuccess {String} token User Token
 * @apiSuccess {String} refreshToken=null Token Refresh
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"type": "bearer",
 *		"token": <token>,
 *		"refreshToken": null
 *    }
 *@apiError (401 Unauthorized) {Object} error Error object
 *@apiError (401 Unauthorized) {String} error.error_code Error code
 *@apiError (401 Unauthorized) {String} error.message Error message
 * @apiErrorExample {json} Invalid Credentials Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *		"error": {
 *			"error_code": "INVALID_CREDENTIALS",
 *			"message": "As credenciais fornecidas são inválidas"
 *		}
 *    }
 * @apiErrorExample {json} Unverified Email Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *		"error": {
 *			"error_code": "UNVERIFIED_EMAIL",
 *			"message": "O e-mail informado não foi verificado"
 *		}
 *    }
 *
 */
Route.post('/auth/login', 'AuthController.auth').validator('Session');

/**
 * @api {get} /auth/forgot-password Forgot Password Route
 * @apiGroup Auth
 * @apiParam {String} email Mandatory User Email.
 * @apiParam {String} [scope] Optional Scope.
 * @apiParamExample  {json} Request sample:
 * ?email=test@test.com&scope=admin
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 *@apiError (400 Bad Request) {Object} error Error object
 *@apiError (400 Bad Request) {String} error.error_code Error code
 *@apiError (400 Bad Request) {String} error.message Error message
 *@apiErrorExample {json} Invalid Email Error
 *    HTTP/1.1 400 Bad Request
 *    {
 *		"error": {
 *			"error_code": "INVALID_EMAIL",
 *			"message": "O email é inválido ou não existe."
 *		}
 *    }
 */
Route.get('/auth/forgot-password', 'AuthController.forgotPassword').validator('ForgotPassword');

/**
 * @api {post} /auth/reset-password Resets User Password
 * @apiGroup Auth
 * @apiParam {String} token Mandatory Token.
 * @apiParam {String} password Mandatory User Password.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"token": "<reset-pw token>",
 *		"password": "newpass"
 *    }
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 *@apiError (401 Unauthorized) {Object} error Error object
 *@apiError (401 Unauthorized) {String} error.error_code Error code
 *@apiError (401 Unauthorized) {String} error.message Error message
 *@apiErrorExample {json} Invalid Token Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *		"error": {
 *			"error_code": "INVALID_TOKEN",
 *			"message": "O token é inválido."
 *		}
 *    }
 */
Route.post('/auth/reset-password', 'AuthController.resetPassword').validator('ResetPassword');

/**
 * @api {post} /auth/confirm-account Confirms User Account
 * @apiGroup Auth
 * @apiParam {String} token Mandatory Token.
 * @apiParam {String} scope Mandatory Scope.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"token": "<confirm-ac token>",
 *		"scope": "web"
 *    }
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 *@apiError (401 Unauthorized) {Object} error Error object
 *@apiError (401 Unauthorized) {String} error.error_code Error code
 *@apiError (401 Unauthorized) {String} error.message Error messag
 *@apiErrorExample {json} Invalid Token Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *		"error": {
 *			"error_code": "INVALID_TOKEN",
 *			"message": "O token é inválido."
 *		}
 *    }
 */
Route.post('/auth/confirm-account', 'AuthController.confirmAccount').validator('ConfirmAccount');

/**
 * @api {post} /auth/resend-confirmation-emai Resends Confirmation Email
 * @apiGroup Auth
 * @apiParam {String} email Mandatory User Email.
 * @apiParam {String} [scope] Optional Scope.
 * @apiParamExample  {json} Request sample:
 *    {
 *		"email": "user@email.com",
 *		"scope": "web"
 *    }
 * @apiSuccess {Boolean} success Success Flag
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"success":"true"
 *    }
 */
Route.post('/auth/resend-confirmation-email', 'AuthController.resendConfirmationEmail');
