const auth = require('../authentication/auth.js');
const twitterClient = require('../authentication/twitterClient.js');


exports.tweet = async (req, res, next) => {
    if (req.cookies.twitterAuth) {
        const { accToken, accSecret } = auth.twitterCredentials(req.cookies.twitterAuth);
        const userTwitterClient = twitterClient.tempClient(accToken, accSecret);

        try {
            await userTwitterClient.v1.tweet()
        } catch (error) {
            console.log(error);
        }
    }

}
