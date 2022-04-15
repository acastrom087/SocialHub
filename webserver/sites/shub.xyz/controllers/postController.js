var Post = require('../models/post.js');
var Instagram = require('instagram-web-api');


const client = new Instagram({
    username: 'anthonycastromesen13',
    password: 'facebook13'
});

const loginInstagram = (foto, description) => {
    console.log('Loggins in...');
    client
    .login()
    .then((res) => {
        instagramPostFunction(foto, description);
        console.log('Login exitoso' + foto);
    })
    .catch(err => {
        console.log('Login failed')
        console.log(err.message);
    })

}


const instagramPostFunction = async(foto, description) => {
    const photo =  'C:/Users/antho/Documents/Anthony/UTN/Software Libre/socialhub/webserver/sites/shub.xyz/public/images/'+ foto;
        await client.uploadPhoto({
        photo: photo,
        caption: description,
        post:'feed'
    })
    .then((res) => {
        const media = res.media;
        console.log('media' + media)
    }).catch((err)=> console.log('Error' + err.message ))
}


exports.getAll = (req, res, next) =>{

    Post.getAll(function(err,data){
        if(err){
            console.log('error');
        }else{
        res.render('post/index', {datos: data});
        }
    })
}

exports.create = (req, res, next) =>{
    res.render('post/create', {data: null});
}

exports.save = (req, res, next) =>{
    const id = req.body.id
    const date = req.body.date;
    const image = req.file.filename;
    const description = req.body.description;
    console.log(req.file.filename);
    const post = new Post(date, image, description, id); 
    post.save(function(err){
        if(err){
            console.log(err);
        }else{

            res.redirect('/post/post');
        }

    })
    
}

exports.delete = (req, res, next) =>{
    Post.delete(req.params.id)
    res.redirect('/post/post'); 
}

exports.edit = (req, res, next) =>{
    Post.findById(req.params.id, (err, data) =>{
        console.log(data);
        res.render('post/edit', {data: data})
    })
   
}

exports.post=(req, res, next)=>{
    var id = req.params.id;
    Post.findById(id, (err, data) =>{
        var name = data[0].image;
        var name = data[0].description;
        loginInstagram(name, description);
    })
    

}



