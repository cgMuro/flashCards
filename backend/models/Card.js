const mysql = require('mysql');
const util = require('util');
const { cursor } = require('../config/database');

const query = util.promisify(cursor.query).bind(cursor);


class Card {

    // Create card table
    async createCardTable() {
        try {
            await query(
                `CREATE TABLE IF NOT EXISTS Card (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    question VARCHAR(255),
                    answer VARCHAR(255),
                    user_id int,
                    deck_id int,
                    date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (id),
                    FOREIGN KEY (user_id) REFERENCES User(id),
                    FOREIGN KEY (deck_id) REFERENCES Deck(id)
                )`
            );
            console.log('Card table created');
            return;
        } catch (error) {
            return error;
        }
    }

    // Get single card by id
    async getCard(id) {
        try {
            const sql = mysql.format("SELECT * FROM Card WHERE id=?", [id]);
            const res = await query(sql);
            return res[0];
        } catch (error) {
            return error;
        }
    }

    // Get all cards by deck
    async getCards(deck_id) {
        try {
            const sql = mysql.format("SELECT * FROM Card WHERE deck_id=?", [deck_id]);
            const res = await query(sql);
            return res;
        } catch (error) {
            return error;
        }
    }

    // Get all user cards
    async getUserCards(user_id) {
        try {
            const sql = mysql.format("SELECT * FROM Card WHERE user_id=?", [user_id]);
            const res = await query(sql);
            return res;
        } catch (error) {
            return error;
        }
    }

    // Create new card
    async createCard({ question, answer, user_id, deck_id }) {
        try {
            const sql = mysql.format("INSERT INTO Card (question, answer, user_id, deck_id) VALUES (?, ?, ?, ?)", [question, answer, user_id, deck_id]);
            const res = await query(sql);
            cursor.commit();
            return res.insertId;
        } catch (error) {
            return error;
        }
    }

    // Update card
    async updateCard({ id, question, answer }) {
        try {
            if (question) {
                const sql = mysql.format("UPDATE Card SET question=? WHERE id=?", [question, id]);
                const res = await query(sql);
                cursor.commit();
                return res;
            }
            if (answer) {
                const sql = mysql.format("UPDATE Card SET answer=? WHERE id=?", [answer, id]);
                const res = await query(sql);
                cursor.commit();
                return res;
            }
            return;
        } catch (error) {
            return error;
        }
    }

    // Delete card
    async deleteCard(id) {
        try {
            const sql = mysql.format("DELETE FROM Card WHERE id=?", [id]);
            const res = await query(sql);
            cursor.commit();
            return res;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new Card();