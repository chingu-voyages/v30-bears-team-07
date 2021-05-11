const User = require("../models/users");

/**
 * @api {post} /user/create/ user/create
 * @apiName auth/register
 * @apiGroup Auth
 *
 * @apiDescription Creates a user.
 *
 * @apiParam {String} username username of user.
 * @apiParam {String} email email of user.
 * @apiParam {String} password password of user.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "username": "test",
 *   "email": "email@bears.com",
 *   "password": "test",
 *  }
 *
 * @apiSuccess {String} message User created successfully..
 *
 * @apiSuccessExample {String} Success-Response:
 *
 *  {
 *     "statusCode": 200,
 *     "message": "User created successfully."
 *  }
 *
 * @apiError (500 Internal server error) message Internal server error.
 *
 * @apiErrorExample Error-Response:
 *  {
 *     "statusCode": 500,
 *     "message": "Internal server error"
 *  }
 */

const signup = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;
    /*
    ADD CODE HERE
    */
    return res.json({
        statuCode: 200,
        message: "User created successfully.",
    })
};

/**
 * @api {post} /user/login/ user/login
 * @apiName user/login
 * @apiGroup User
 *
 * @apiDescription Returns an access token for the user.
 *
 * @apiParam {String} username username of user.
 * @apiParam {String} password password of user.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "username": "test",
 *   "password": "test",
 *  }
 *
 * @apiSuccess {String} message accessToken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6ImVtYWlsQG1tby5jb20iLCJpYX...
 *
 * @apiSuccessExample {String} Success-Response:
 *
 *  {
 *     "statusCode": 200,
 *     "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6ImVtYWlsQG1tby5jb20iLCJpYXQiOjE2MDI4NTU2MDgsImV4cCI6MTYwMjg1OTIwOH0.sG0afJbmNSrf-MAMWMqyeqZR7rqEwerfRIJvIvhOnoo"
 *  }
 *
 * @apiError (500 Internal server error) message Internal server error.
 *
 * @apiErrorExample Error-Response:
 *  {
 *     "statusCode": 500,
 *     "message": "Internal server error"
 *  }
 */


const login = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;
    /*
    ADD CODE HERE
    */
    return res.json({
        statuCode: 200,
        message: "User created successfully.",
    })
}

module.exports = {
  signup,
  login
}