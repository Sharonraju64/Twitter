const express = require('express');
const router = express.Router();
const { ApifyClient } = require('apify-client');

const client = new ApifyClient({
    token: process.env.APIFYCLIENT_TOKEN 
});

router.get('/gettweets', async(req, res) =>{
    const query = req.query.q;
    const input = {
        "searchTerms": [
            query
        ],
        "tweetsDesired": 1,
        "profileDesired": 5,
        "addUserInfo": true
    };

    const data = await client.actor("ti9kXlurJr0OEmF4k").call(input);
    const { items } = await client.dataset(data.defaultDatasetId).listItems();
    res.send(items);
});

module.exports = router