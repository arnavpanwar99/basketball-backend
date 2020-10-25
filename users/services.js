const { secret } = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../helpers/db');

const authenticate = async ({
    username,
    password
}) => {

    const user = await User.findOne({ username });
    if(user && bcrypt.compareSync(password, user.hash)){
        const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    };
};

const getAll = async () => await User.find();

const getById = async id => await User.findById(id);

const getByUsername = async username => await User.findOne({ username });

const create = async params => {

    // validating user
    const existingUser = await User.findOne({ username: params.username });
    if(existingUser){
        throw `Username ${params.username} is already taken`;
    };

    const user = new User(params);

    // hashing password
    if(params.password){
        user.hash = bcrypt.hashSync(params.password, 10);
    };

    // saving user
    await user.save();

    // logging in user right away
    return await authenticate({
        username: params.username, 
        password: params.password
    });
};

const update = async (id, params) => {

    const user = await User.findById(id);

    // validating user
    if(!user){
        throw 'User not found';
    };
    if(user.username !== params.username && await User.findOne({ username: params.username })){
        throw `Username ${user.username} is already taken`;
    };

    //hashing password
    if(params.password){
        params.hash = bcrypt.hashSync(params.password, 10);
    };

    // copy params to user
    Object.assign(user, params);

    await user.save();
};

const _delete = async id => await User.findByIdAndRemove(id);

module.exports = {
    authenticate,
    getAll,
    getById,
    getByUsername,
    create,
    update,
    delete: _delete
};