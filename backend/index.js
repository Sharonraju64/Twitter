const express = require('express');
const dbConnect = require('./dbconnect');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const port = 5000;
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/loginHistory');

app.use(cors());
dotenv.config();
app.use(express.json());
dbConnect();

app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);

app.get('/', (req, res) =>{
    res.send('Hello from Twitter!');
});

app.listen(port, () =>{
    console.log(`Twitter listening on port ${port}`);
});