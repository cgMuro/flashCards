const mysql = require('mysql');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config/.env' });

// Create connection with mysql
const cursor = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Connect function
const connectDB = () => {
    // Connect to database
    cursor.connect(err => {
        if (err) throw err;
        console.log('MySQL database connected!');
    });

    // Create database
    cursor.query("CREATE DATABASE IF NOT EXISTS flashCards DEFAULT CHARACTER SET 'utf8'", (err, res) => {
        if (err) throw err;
        console.log('Database initiated!');
    });
} 

// Export connect function and cursor
module.exports = {
    connectDB,
    cursor
};