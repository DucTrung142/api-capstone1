require('dotenv').config();

const db = require('./config/db');
const express = require('express');
const cors = require('cors');

//choox ni không nên import nè. import là bên reactjs rồi á.

//router
const authRoute = require('./routes/api/auth');
const userRoute = require('./routes/api/user');
const uploadRoute = require('./routes/api/upload');
const question = require('./routes/api/question');

//connect to DB
db.connect();

//bodyParser Middelware
const app = express();
app.use(express.json()); // we need to tell server to use json as well
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // We're telling express to use CORS

//user router
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/upload', uploadRoute);
app.use('/quiz', question);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Sever run at http://localhost:${PORT}`));
