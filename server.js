const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require("mongoose");

dbConnect().then(() => console.log('MongoDB connected!')).catch((err) => console.log(err));
async function dbConnect() {
    console.log(process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI);
}

const products = require('./controller/products-controller.js');
app.use('/api/products', products);

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to DressStore application.' });
});

app.listen(3000, () => console.log('DressStore app is listening on port 3000.'));
