require('dotenv').config();

const db = require('./config/db');
const express = require('express');
const cors = require('cors');

const app = express();

//router
const authRouter = require('./routes/api/auth');

//connect to DB
db.connect();

//bodyParser Middelware
app.use(express.json());

app.use(cors);

// app.get('/', (req, res) => {
//   res.send('Khoa ngu');
// });

//user router
app.use('/auth', authRouter);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Sever run at http://localhost:${PORT}`));
