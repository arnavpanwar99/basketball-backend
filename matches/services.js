const { Match } = require('../helpers/db');
const { getOpponentData } = require('../common/services');

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
};

const startMatch = async ({
    player1, player2, startedAt, endsAt
}) => {

    if(!player1 || !player2 || !startedAt || !endsAt){
        throw 'Invalid request parameters';
    };

    const newMatch = new Match({
        player1, player2, startedAt, endsAt
    });

    await newMatch.save();
    const matchData = await getOpponentData(player1, player2);
    return {...matchData, id: newMatch.id};
};

const saveMatch = async ({
    id, scoredByFirst = 0, scoredBySecond = 0
}) => {

    if(!id){
        throw 'Invalid match id';
    }

    currentMatch = await Match.findById(id);

    Object.assign(currentMatch, {
        scoredByFirst, scoredBySecond
    });

    await currentMatch.save();
    return currentMatch;
};

module.exports = {
    getById,
    getPlayerMatches,
    createMatch,
    updateMatch,
    startMatch,
    saveMatch
};