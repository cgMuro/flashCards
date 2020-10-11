const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

const { 
    getCard, 
    getCards, 
    getUserCards,
    createCard,  
    updateCard,
    deleteCard
} = require('../controlls/cards');

router.route('').get(auth, getUserCards);
router.route('/:id').get(auth, getCard);
router.route('/deck/:deck_id').get(auth, getCards);

router.route('/deck/:deck_id').post(auth, createCard);

router.route('/:id').put(auth, updateCard);

router.route('/:id').delete(auth, deleteCard);

module.exports = router;