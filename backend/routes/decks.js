const express = require('express');
const auth = require('../middlewares/auth');

// Get Deck controlls
const { 
    getDeck, 
    getDecks, 
    createDeck,  
    updateDeck,
    deleteDeck
} = require('../controlls/decks');

// Init router
const router = express.Router();

// Routes
router.route('/').get(auth, getDecks);
router.route('/:id').get(auth, getDeck);

router.route('/').post(auth, createDeck);

router.route('/:id').put(auth, updateDeck);

router.route('/:id').delete(auth, deleteDeck);

module.exports = router;