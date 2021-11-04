require('dotenv').config();

require('module-alias/register');
const db = require('./config/db');
const express = require('express');
const cors = require('cors');
//router
const authRoute = require('@api/auth');
const userRoute = require('@api/user');
const uploadRoute = require('@api/upload');
const question = require('@api/question');
const uploadfileRoute = require('@api/uploadfile');

//connect to DB
db.connect();

//bodyParser Middelware
const app = express();
app.use(express.json()); // we need to tell server to use json as well
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // We're telling express to use CORS

// End point
app.get('/', (req, res) => {
  res.json('Api is working');
});

//use router
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/upload', uploadRoute);
app.use('/quiz', question);
app.use('/upload', uploadfileRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Sever run at http://localhost:${PORT}`));
