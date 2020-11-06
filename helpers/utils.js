const prepareUsersData = (users = [], matches = []) => {

    return users.map(user => {

        const { id } = user;
        const matchData = {
            matches: 0,
            won: 0,
            lost: 0,
            scored: 0,
            conceded: 0,
            points: 0
        };

        matches.forEach(match => {

            const isValidMatch = match.scoredByFirst || match.scoredBySecond;
            if(match.player1 === id && isValidMatch){
                matchData['matches']++;
                matchData['scored'] += match.scoredByFirst;
                matchData['conceded'] += match.scoredBySecond;

                if(match.scoredByFirst > match.scoredBySecond){
                    matchData['won']++;
                    matchData['points'] += 3;
                }else{
                    matchData['lost']++;
                }
            }else if(match.player2 === id && isValidMatch){
                matchData['matches']++;
                matchData['conceded'] += match.scoredByFirst;
                matchData['scored'] += match.scoredBySecond;

                if(match.scoredByFirst < match.scoredBySecond){
                    matchData['won']++;
                    matchData['points'] += 3;
                }else{
                    matchData['lost']++;
                }
            }
        });

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            id: user.id,
            username: user.username,
            ...matchData
        };
    });
};

const prepareOpponentData = (matches = [], obj) => {


    const schema = {
        won: 0, lost: 0, winProbability: 0, scored: 0, conceded: 0, points: 0, name: ''
    };
    const relevantMatches = matches.filter(el => el.scoredByFirst || el.scoredBySecond);
    const data = {
        matches: relevantMatches.length,
    };

    relevantMatches.forEach(match => {

        const { scoredByFirst, scoredBySecond, player1, player2 } = match;
        if(!data[player1]){
            data[player1] = JSON.parse(JSON.stringify(schema));
        };
        if(!data[player2]){
            data[player2] = JSON.parse(JSON.stringify(schema));
        };

        data[player1]['scored'] += scoredByFirst;
        data[player2]['scored'] += scoredBySecond;
        data[player1]['conceded'] += scoredBySecond;
        data[player2]['conceded'] += scoredByFirst;

        if(scoredByFirst > scoredBySecond){
            data[player1]['won']++;
            data[player2]['lost']++;
            data[player1]['points'] += 3;
            
        }else{
            data[player2]['won']++;
            data[player1]['lost']++;
            data[player2]['points'] += 3;
        };
        data[player1]['winProbability'] = ((data[player1]['won'] || 0) / (data['matches'] || 0)) !== 1 ? ((data[player1]['won'] || 0) / (data['matches'] || 0)) || .01 : .99;
        data[player2]['winProbability'] = ((data[player2]['won'] || 0) / (data['matches'] || 0)) !== 1 ? ((data[player2]['won'] || 0) / (data['matches'] || 0)) || .01 : .99;
        data[player1]['name'] = obj[player1];
        data[player2]['name'] = obj[player2];
    
    });

    // data[player1]['firstName'] = fP;
    // data[player2]['firstName'] = sP;

    return data;
}

module.exports = {
    prepareUsersData,
    prepareOpponentData
};