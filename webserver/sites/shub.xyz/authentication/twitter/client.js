const fs = require('fs');
const dotenv = require('dotenv');
const Twitter = require('twitter-v2');


const CONFIG = dotenv.parse(fs.readFileSync('.env'));

const client = new Twitter({
    consumer_key: CONFIG.CONSUMER_TOKEN,
    consumer_secret: CONFIG.CONSUMER_SECRET,
  });

module.exports = client;