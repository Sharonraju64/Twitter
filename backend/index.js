const express = require('express');
const dbConnect = require('./dbconnect');
const cors = require('cors');
const app = express();
const port = 5000;
const postRouter = require('./routes/post');

app.use(cors());
app.use(express.json());
dbConnect();

app.use('/api/post', postRouter);

app.get('/', (req, res) =>{
    res.send('Hello from Twitter!');
});

app.listen(port, () =>{
    console.log(`Twitter listening on port ${port}`);
});