const { Router } = require('express');
const router = Router();
const commonServices = require('./services');

const sendAllData = (req, res, next) => {

    commonServices.getAllUserData().then(data => {
        res.json(data);
    }).catch(err => next(err));
};

const sendOpponentData = (req, res, next) => {

    const { player1, player2 } = req.body;
    commonServices.getOpponentData(player1, player2).then(data => {
        res.json(data);
    }).catch(err => next(err));
}

router.get('/all', sendAllData);
router.get('/twoPlayer', sendOpponentData)

module.exports = router;
