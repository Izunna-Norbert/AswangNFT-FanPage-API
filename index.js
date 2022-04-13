const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./route');

const app = express();
require('dotenv').config()

const options = {
    keepAlive: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
connectDB().catch(err => console.log(err));

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL, options);
}
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

app.use('/', routes);

app.listen(process.env.PORT || 3000 , () => {
    console.info(' ASWANG API listening on PORT 3000');
})