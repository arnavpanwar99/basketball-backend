const { Router } = require('express');
const router = Router();
const userServices = require('./services');

const sendUser = (res, user, errorMessage) => {
    if(user){

        // enable this to send user token as a cookie
        // res.cookie('token', user.token, {
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        //     httpOnly: true,
        //     sameSite: 'lax'
        // });
        delete user.token;
        res.json(user);
    }else{
        res.status(400).json({
            message: errorMessage
        });
    };
}

const authenticate = (req, res, next) => {

    userServices.authenticate(req.body).then(user => {
        sendUser(res, user, 'Username or password is incorrect');
    }).catch(err => next(err));
};

const register = (req, res, next) => {

    userServices.create(req.body).then(user => {
        sendUser(res, user, 'Error while creating the account');
    }).catch(err => next(err));
};

const getAll = (req, res, next) => {

    userServices.getAll().then(users => {
        res.json(users);
    }).catch(err => next(err));
};

const getByUsername = (req, res, next) => {

    userServices.getByUsername(req.query.username).then(user => {
        if(user){
            res.json(user);
        }else{
            res.status(404).json({
                message: 'No user exist by that usename'
            });
        };
    }).catch(err => next(err));
}

const current = ({ req, res, next }, sub = true) => {
    let id;
    if(sub){
        id = req.user.sub;
    }else{
        id = req.params.id;
    };

    userServices.getById(id).then(user => {
        if(user){
            res.json(user);
        }else{
            res.sendStatus(404).json({
                message: 'No user exists matching that id'
            });
        }
    }).catch(err => next(err));
};

const getCurrent = (req, res, next) => current({ req, res, next });

const getById = (req, res, next) => current({ req, res, next }, false);

const update = (req, res, next) => {
    
    userServices.update(req.query.id, req.body).then(() => {
        res.json({
            message: 'User updated successfully',
            success: true
        });
    }).catch(err => next(err));
};

const _delete = (req, res, next) => {

    userServices.delete(req.params.id).then(() => {
        res.json({
            message: 'User deleted successfully',
            success: true
        });
    }).catch(err => next(err));
};

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/name', getByUsername);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/update', update);
router.delete('/:id', _delete);

module.exports = router;