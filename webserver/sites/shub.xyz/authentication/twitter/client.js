const fs = require('fs');
const dotenv = require('dotenv');
const TwitterApi = require('twitter-api-v2');


const CONFIG = dotenv.parse(fs.readFileSync(__dirname + '/../.env'));

const client = new TwitterApi({ appKey: CONFIG.CONSUMER_TOKEN, appSecret: CONFIG.CONSUMER_SECRET });

module.exports = client;