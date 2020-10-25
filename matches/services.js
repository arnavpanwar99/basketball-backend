const { Match } = require('../helpers/db');

const getById = async ({id1, id2}) =>  await Match.findOne({
    players: { $all: [id1, id2] }
});

const getPlayerMatches = async id => await Match.find({
    players: { $all: [id] }
});

const createMatch = async ({ id1, id2 }) => {

    const match = await getById({ id1, id2 });
    if(match){
        return match;
    };

    const newMatch = new Match({
        players: [id1, id2],
    });

    await newMatch.save();
    return newMatch;
}

const updateMatch = async ({id1, id2}, params) => {

    const match = await getById({ id1, id2 });
    
    if(!match){
        throw 'Match not found';
    };

    Object.assign(match, params);
    await match.save();
}

module.exports = {
    getById,
    getPlayerMatches,
    createMatch,
    updateMatch,
};