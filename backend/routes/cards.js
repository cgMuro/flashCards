const express = require('express');
const auth = require('../middlewares/auth');

// Get Card controlls
const { 
    getCard, 
    getCards, 
    getUserCards,
    createCard,  
    updateCard,
    deleteCard
} = require('../controlls/cards');

// Init router
const router = express.Router();

// Routes
router.route('').get(auth, getUserCards);
router.route('/:id').get(auth, getCard);
router.route('/deck/:deck_id').get(auth, getCards);

router.route('/deck/:deck_id').post(auth, createCard);

router.route('/:id').put(auth, updateCard);

router.route('/:id').delete(auth, deleteCard);

module.exports = router;