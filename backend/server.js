require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Book Management System with JWT Authentication');
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
