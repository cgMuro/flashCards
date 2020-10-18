const Deck = require('../models/Deck');


// @desc --> Get deck by id
// @route --> GET api/decks/:id
// @acces --> Private
exports.getDeck = async(req, res, next) => {
    // Get deck
    const deck = await Deck.getDeck(req.params.id);
    // Set response status
    res.status(200).json({ success: true, data: deck });
}


// @desc --> Get decks
// @route --> GET api/decks
// @acces --> Private
exports.getDecks = async(req, res, next) => {
    // Get decks
    const decks = await Deck.getDecks(req.user.id);
    // Set response status
    res.status(200).json({ success: true, data: decks });
}


// @desc --> Create new deck
// @route --> POST api/decks
// @acces --> Private
exports.createDeck = async(req, res, next) => {
    try {
        // Set user id
        req.body.user_id = req.user.id;
        // Create new deck
        await Deck.createDeck(req.body);
        // Get just created deck
        const deck = await Deck.getDeckbyName(req.body.name);
        // Set response status
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
        // Set id
        req.body.id = req.params.id;
        // Update deck
        await Deck.updateDeck(req.body);
        // Get just updated deck
        const deck = await Deck.getDeck(req.body.id);
        // Set response status
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
        // Get deck to delete
        const deck = await Deck.getDeck(req.params.id);
        // Delete deck
        await Deck.deleteDeck(req.params.id);
        // Set response status
        res.status(200).json({ success: true, message: 'Deck eliminated', data: deck });
    } catch (error) {
        next(new Error(error));
    }
}
