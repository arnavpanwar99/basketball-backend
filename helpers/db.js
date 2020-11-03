const { connectionString, localConnectionString } = require('../config.json');
const mongoose = require('mongoose');
const { userModel } = require('../users/model');
const { matchModel } = require('../matches/model');

let url = connectionString;
if(process.env.NODE_ENV === 'development'){
    url = localConnectionString;
}

mongoose.connect(url, {
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