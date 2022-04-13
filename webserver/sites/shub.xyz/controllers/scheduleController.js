var Schedule = require('../models/schedule');
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
    const photo =  './public/imagen.jpg';
        await client.uploadPhoto({
        photo: photo,
        captions:'Prueba desde express.js',
        post:'feed'
    })
    .then((res) => {
        const media = res.media;
        console.log('media' + media)
    }).catch((err)=> console.log('Error' + err.message ))
}

exports.post=(req, res, next)=>{
   
    loginFunction();
    res.send('yes');

}

exports.getAll = (req, res, next) =>{

    Schedule.getAll(function(err,data){
        if(err){
            console.log('error');
        }else{
        res.render('schedule/index', {datos: data});
        }
    })
}

exports.create = (req, res, next) =>{
    res.render('schedule/create', {data: null});
}

exports.save = (req, res, next) =>{
    const id = req.body.id
    const date = req.body.date;
    const image = req.file.filename;
    console.log(req.file.filename);
    const schedule = new Schedule(date, image, id); 
    schedule.save(function(err){
        if(err){
            console.log(err);
        }else{

            res.redirect('/schedule/schedule');
        }

    })
    
}

exports.delete = (req, res, next) =>{
    Schedule.delete(req.params.id)
    res.redirect('/schedule/schedule'); 
}

exports.edit = (req, res, next) =>{
    Schedule.findById(req.params.id, (err, data) =>{
        console.log(data);
        res.render('schedule/edit', {data: data})
    })
   
}



