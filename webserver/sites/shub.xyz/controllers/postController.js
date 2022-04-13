var Instagram = require('instagram-web-api');



const client = new Instagram({
    username: 'anthonycastromesen13',
    password: 'facebook13'
});

const loginFunction = () => {
    console.log('Loggins in...');
    client
    .login()
    .then((res) => {
        instagramPostFunction();
        console.log('Login exitoso');
    })
    .catch(err => {
        console.log('Login failed')
        console.log(err.message);
    })

}


const instagramPostFunction = async() => {
    const photo =  'C:/Users/antho/Documents/Anthony/UTN/Software Libre/socialhub/webserver/sites/shub.xyz/public/images/'+ 'imagen.jpg';
    console.log(photo);
        await client.uploadPhoto({
        photo: photo,
        caption:'Prueba desde express.js',
        post:'feed'
    })
    .then((res) => {
        const media = res.media;
        console.log('media' + media)
    }).catch((err)=> console.log('Error' + err.message ))
}

exports.post=(req, res, next)=>{
    instagramPostFunction();
    //loginFunction();
    res.send('yes');

}