const { Match } = require('../helpers/db');
const { User } = require('../helpers/db');
const { prepareUsersData, prepareOpponentData } = require('../helpers/utils');

const getAllUserData = async () => {
    const allUsers = await User.find();
    const allMatches = await Match.find();

    return prepareUsersData(allUsers, allMatches);

};

const getOpponentData = async (p1, p2) => {
    const firstPlayer = await User.findById(p1);
    const secondPlayer = await User.findById(p2);
    const desiredMatches = await Match.find({
        player1: { $in: [p1, p2] },
        player2: { $in: [p1, p2] }
    });
    const fId = firstPlayer.id;
    const sId = secondPlayer.id;
    const playerData = {};
    playerData[fId] = firstPlayer.firstName;
    playerData[sId] = secondPlayer.firstName;

    return prepareOpponentData(desiredMatches, playerData);
}

module.exports = {
    getAllUserData,
    getOpponentData
};