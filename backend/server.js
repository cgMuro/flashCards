const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB }  = require('./config/database');   // Connect to database function
const User = require('./models/User');
const Deck = require('./models/Deck');
const Card = require('./models/Card');


// Load environment variables
dotenv.config({ path: './config/.env' });

// Connect to database
connectDB();
// Create tables
User.createUserTable();
Deck.createDeckTable();
Card.createCardTable();

// Init app
const app = express();

// App middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/decks', require('./routes/decks'));
app.use('/api/cards', require('./routes/cards'));


// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set Static folder
    app.use(express.static('../frontend/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(path.dirname(__dirname), 'frontend', 'build', 'index.html'))
    })
}

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
