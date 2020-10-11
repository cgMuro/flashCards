const Deck = require('../models/Deck');


// @desc --> Get deck by id
// @route --> GET api/decks/:id
// @acces --> Private
exports.getDeck = async(req, res, next) => {
    const deck = await Deck.getDeck(req.params.id);
    res.status(200).json({ success: true, data: deck });
}


// @desc --> Get decks
// @route --> GET api/decks
// @acces --> Private
exports.getDecks = async(req, res, next) => {
    const decks = await Deck.getDecks(req.user.id);
    res.status(200).json({ success: true, data: decks });
}


// @desc --> Create new deck
// @route --> POST api/decks
// @acces --> Private
exports.createDeck = async(req, res, next) => {
    try {
        req.body.user_id = req.user.id;
        await Deck.createDeck(req.body);
        const deck = await Deck.getDeckbyName(req.body.name);
        res.status(201).json({ success: true, message: 'Deck created', data: deck });
    } catch (error) {
        next(new Error(error));
    }
}


// @desc --> Update deck
// @route --> PUT api/decks/:id
// @acces --> Private
exports.updateDeck = async(req, res, next) => {
    try {
        req.body.id = req.params.id;
        await Deck.updateDeck(req.body);
        const deck = await Deck.getDeck(req.body.id);
        res.status(200).json({ success: true, message: 'Deck updated', data: deck });
    } catch (error) {
        next(new Error(error));
    }
}


// @desc --> Delete stock
// @route --> DELETE api/stocks/:id
// @acces --> Private
exports.deleteDeck = async(req, res, next) => {
    try {
        const deck = await Deck.getDeck(req.params.id);
        await Deck.deleteDeck(req.params.id);
        res.status(200).json({ success: true, message: 'Deck eliminated', data: deck });
    } catch (error) {
        next(new Error(error));
    }
}
