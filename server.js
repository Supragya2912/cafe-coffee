const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT
const connectMongo = require('./db');
const cors = require('cors');
connectMongo();
const origin = "http://localhost:3000";


app.use(cors({
    credentials: true,
    origin
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/authRoutes'));


app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
}
);
