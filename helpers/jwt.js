const expressJwt = require('express-jwt');
const { secret } = require('../config.json');

const jwt = () => expressJwt({
    secret,
    isRevoked,
    getToken: req => req.cookies.token,
    algorithms: ['HS256']
}).unless({
    path: [

        // all the public routes
        '/users/authenticate',
        '/users/register',
        '/users/name',
        '/users',
        '/matches/single',
        '/matches/all',
        '/matches/create',
        '/matches/update',
        '/users/update'
    ]
});

const isRevoked = async () => {};

module.exports = jwt;