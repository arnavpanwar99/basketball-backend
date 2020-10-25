const { connectionString } = require('../config.json');
const mongoose = require('mongoose');
const { userModel } = require('../users/model');
const { matchModel } = require('../matches/model');

mongoose.connect(process.env.MONGODB_URI || connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

module.exports = {
    User: userModel,
    Match: matchModel
};