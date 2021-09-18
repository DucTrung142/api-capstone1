require('dotenv').config();

const db = require('./config/db');
const express = require('express');
const cors = require('cors');

//choox ni không nên import nè. import là bên reactjs rồi á.

//router
const authRoute = require('./routes/api/auth');
const userRoute = require('./routes/api/user');

//connect to DB
db.connect();

//bodyParser Middelware
const app = express();
app.use(express.json());

app.use(cors());

//user router
app.use('/auth', authRoute);
app.use('/user', userRoute);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Sever run at http://localhost:${PORT}`));
