const mysql = require('mysql');
const util = require('util');
const { cursor } = require('../config/database');

const query = util.promisify(cursor.query).bind(cursor);


class User {

    // Create user table
    async createUserTable() {
        try {
            await query(
                `CREATE TABLE IF NOT EXISTS User (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    username VARCHAR(255),
                    email VARCHAR(100),
                    password VARCHAR(255),
                    register_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY(id)
                )`,
            );
            console.log('User table created');
            return;
        } catch (error) {
            return error;
        }
    }

    // Create user
    async createUser(username, email, password) {
        try {
            const sql = mysql.format("INSERT INTO User (username, email, password) VALUES (?, ?, ?)", [username, email, password]);
            const res = await query(sql);
            cursor.commit();
            return res;
        } catch (error) {
            return error;
        }
    }

    // Get user by email
    async getUser(email) {
        try {
            const sql = mysql.format("SELECT * FROM User WHERE email=?", [email]);
            const res = await query(sql);
            return res[0];
        } catch (error) {
            return error;
        }
    }

    // Get user by id
    async getUserbyId(id) {
        try {
            const sql = mysql.format("SELECT id, username, email, register_date FROM User WHERE id=?", [id]);
            const res = await query(sql);
            return res;
        } catch (error) {
            return error;
        }
    }

    // Update user
    async updateUser(id, what, how) {
        try {
            const sql = mysql.format(`UPDATE User SET ${what}=? WHERE id=?`, [how, id]);
            const res = await query(sql);
            cursor.commit();
            return res;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new User();