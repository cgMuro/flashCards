const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

const { 
    getDeck, 
    getDecks, 
    createDeck,  
    updateDeck,
    deleteDeck
} = require('../controlls/decks');

router.route('/').get(auth, getDecks);
router.route('/:id').get(auth, getDeck);

router.route('/').post(auth, createDeck);

router.route('/:id').put(auth, updateDeck);

router.route('/:id').delete(auth, deleteDeck);

module.exports = router;