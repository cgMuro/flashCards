const mysql = require('mysql');
const util = require('util');
const { cursor } = require('../config/database');

const query = util.promisify(cursor.query).bind(cursor);


class Deck {

    // Create deck table
    async createDeckTable() {
        try {
            await query(
                `CREATE TABLE IF NOT EXISTS Deck (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    name VARCHAR(255),
                    user_id int,
                    date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (id),
                    FOREIGN KEY (user_id) REFERENCES User(id)
                )`
            );
            console.log('Deck table created');
            return;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    // Get single deck by id
    async getDeck(id) {
        try {
            const sql = mysql.format("SELECT * FROM Deck WHERE id=?", [id]);
            const res = await query(sql);
            return res[0];
        } catch (error) {
            return error;
        }
    }

    // Get single deck by name
    async getDeckbyName(name) {
        try {
            const sql = mysql.format("SELECT * FROM Deck WHERE name=?", [name]);
            const res = await query(sql);
            return res[0];
        } catch (error) {
            return error;
        }
    }

    // Get all decks
    async getDecks(user_id) {
        try {
            const sql = mysql.format("SELECT * FROM Deck WHERE user_id=?", [user_id]);
            const res = await query(sql);
            return res;
        } catch (error) {
            return error;
        }
    }

    // Create new deck
    async createDeck({ name, user_id }) {
        try {
            const sql = mysql.format("INSERT INTO Deck (name, user_id) VALUES (?, ?)", [name, user_id]);
            const res = await query(sql);
            cursor.commit();
            return res;
        } catch (error) {
            return error;
        }
    }

    // Update deck
    async updateDeck({ id, name }) {
        try {
            const sql = mysql.format("UPDATE Deck SET name=? WHERE id=?", [name, id]);
            const res = await query(sql);
            cursor.commit();
            return res;
        } catch (error) {
            return error;
        }
    }

    // Delete deck
    async deleteDeck(id) {
        try {
            const sql = mysql.format("DELETE FROM Deck WHERE id=?", [id]);
            const res = await query(sql);
            cursor.commit();
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new Deck();