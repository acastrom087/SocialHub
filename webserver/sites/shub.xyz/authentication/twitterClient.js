
const TwitterApi = require('twitter-api-v2').TwitterApi;

const client = new TwitterApi({ appKey: 'IgrYcZuWtVs2MbVUH28dBI5JV', appSecret: 'vCFzIdLBwhFR8Lbs1y2k7e6OehX7Nw9HyzUhAD5ICmZM73fxDk' });

exports.tempClient = (userToken, userSecret) => {
    return new TwitterApi({ appKey: 'IgrYcZuWtVs2MbVUH28dBI5JV', appSecret: 'vCFzIdLBwhFR8Lbs1y2k7e6OehX7Nw9HyzUhAD5ICmZM73fxDk', accessToken: userToken, accessSecret: userSecret });
}

exports.client = client;