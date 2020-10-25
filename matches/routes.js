const { Router } = require('express');
const { route } = require('../users/routes');
const router = Router();
const matchServices = require('./services');

const getSingleMatch = (req, res, next) => {

    matchServices.getById(req.body).then(match => {
        res.json(match);
    }).catch(err => next(err));
};

const getAllMatches = (req, res, next) => {

    matchServices.getPlayerMatches(req.body.id).then(matches => {
        res.json(matches);
    }).catch(err => next(err));
};

const createMatch = (req, res, next) => {

    matchServices.createMatch(req.body).then(match => {
        res.json(match);
    }).catch(err => next(err));
};

const updateMatch = (req, res, next) => {

    const { id1, id2, match } = req.body;
    matchServices.updateMatch({id1, id2}, match).then(() => {
        res.json({
            success: true,
            message: 'Match saved successfully'
        });
    }).catch(err => next(err));
}

router.get('/single', getSingleMatch);
router.get('/all', getAllMatches);
router.post('/create', createMatch);
router.put('/update', updateMatch);

module.exports = router;