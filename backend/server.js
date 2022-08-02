const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const photoRoutes = require('./routes/photoRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 4000;

app.use(cors());
// MIDDLEWARES
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
// app.use(cors({ origin: '*', methods: '*' }));


// ROUTES
app.use('/photos', photoRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("Successfully connected to database"));

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${port}`);
});