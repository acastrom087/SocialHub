const auth = require('../authentication/auth.js');
const twitterClient = require('../authentication/twitterClient.js');

const { accToken, accSecret } = auth.twitterCredentials(req.cookies.twitterAuth);
const userTwitterClient = twitterClient.tempClient(accToken, accSecret);

exports.tweet = async (req, res, next) => {
    try {
        await userTwitterClient.v1.tweet()
    } catch (error) {
        console.log(error);
    }
}
