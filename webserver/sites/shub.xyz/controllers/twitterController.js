const auth = require('../authentication/auth.js');
const twitterClient = require('../authentication/twitterClient.js');


exports.tweet = async (req, res, next) => {
    console.log(req.body);

    return res.redirect('/dashboard');
    /*if (req.cookies.twitterAuth) {
        const { accToken, accSecret } = auth.twitterCredentials(req.cookies.twitterAuth);
        const userTwitterClient = twitterClient.tempClient(accToken, accSecret);

        try {
            const mediaId = await userTwitterClient.v1.uploadMedia();
            await userTwitterClient.v1.tweet()
        } catch (error) {
            console.log(error);
        }
    }*/

}
