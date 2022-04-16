const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy;
const TwitterApi = require('twitter-api-v2').TwitterApi;

const tw = new TwitterApi({ appKey: 'IgrYcZuWtVs2MbVUH28dBI5JV', appSecret: 'vCFzIdLBwhFR8Lbs1y2k7e6OehX7Nw9HyzUhAD5ICmZM73fxDk' });


const client = passport.use(new TwitterStrategy({
    consumerKey: 'IgrYcZuWtVs2MbVUH28dBI5JV',
    consumerSecret: 'vCFzIdLBwhFR8Lbs1y2k7e6OehX7Nw9HyzUhAD5ICmZM73fxDk',
    callbackURL: "http://shub811.xyz:3000/dashboard/auth/twitter/"
},
    function (token, tokenSecret, profile, cb) {
        console.log(profile); 
        console.log(tokenSecret); 
    }
));
module.exports = tw;