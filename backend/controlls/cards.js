const Card = require('../models/Card');


// @desc --> Get card by id
// @route --> GET api/cards/:id
// @acces --> Private
exports.getCard = async(req, res, next) => {
    const card = await Card.getCard(req.params.id);
    res.status(200).json({ success: true, data: card });
}


// @desc --> Get cards
// @route --> GET api/cards/deck/deck_id
// @acces --> Private
exports.getCards = async(req, res, next) => {
    const cards = await Card.getCards(req.params.deck_id);
    res.status(200).json({ success: true, data: cards });
}


// @desc --> Get all user cards
// @route --> GET api/cards/user
// @acces --> Private
exports.getUserCards = async(req, res, next) => {
    const cards = await Card.getUserCards(req.user.id);
    res.status(200).json({ success: true, data: cards });
}


// @desc --> Create new card
// @route --> POST api/cards/deck/:deck_id
// @acces --> Private
exports.createCard = async(req, res, next) => {
    try {
        req.body.user_id = req.user.id;
        req.body.deck_id = req.params.deck_id;
        newCardId = await Card.createCard(req.body);
        newCard = await Card.getCard(newCardId);
        res.status(201).json({ success: true, message: 'Card created', data: newCard });
    } catch (error) {
        next(new Error(error));
    }
}


// @desc --> Update card
// @route --> PUT api/cards/:id
// @acces --> Private
exports.updateCard = async(req, res, next) => {
    try {
        req.body.id = req.params.id
        await Card.updateCard(req.body);
        const card = await Card.getCard(req.params.id);
        res.status(200).json({ success: true, message: 'Card updated', data: card });
    } catch (error) {
        console.log(error)
        next(new Error(error));
    }
}


// @desc --> Delete card
// @route --> DELETE api/cards/:id
// @acces --> Private
exports.deleteCard = async(req, res, next) => {
    try {
        const card = await Card.getCard(req.params.id);
        await Card.deleteCard(req.params.id);
        res.status(200).json({ success: true, message: 'Card eliminated', data: card });
    } catch (error) {
        next(new Error(error));
    }
}