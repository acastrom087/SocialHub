const auth = require('../authentication/auth.js');
const twitterClient = require('../authentication/twitterClient.js');


exports.tweet = async (req, res, next) => {
    if (req.cookies.twitterAuth) {
        const { accToken, accSecret } = auth.twitterCredentials(req.cookies.twitterAuth);
        const userTwitterClient = twitterClient.tempClient(accToken, accSecret);
        
        try {
            //const mediaId = await userTwitterClient.v1.uploadMedia();
            await userTwitterClient.v1.tweet('Prueba desde express')
            .then((res) => console.log('Respuesta de promesa ' + res))
            .catch((err) => console.log('Error de promesa ' + err.message))
            console.log('nada')
        } catch (error) {
            console.log('Error de catch ' + error);
        }
    }
    return res.redirect('/dashboard');

}
