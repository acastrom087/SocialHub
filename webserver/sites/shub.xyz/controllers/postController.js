const Post = require('../models/post.js');
var cron = require('node-cron');
const { time } = require('cron');
require('dotenv').config();
const auth = require('../authentication/auth.js');
const twitterClient = require('../authentication/twitterClient.js');


exports.createPost = (req, res, next) => {
    if(req.body.date)
    process.env.TZ;
    var queueTime = new Date();
    queueTime.setMinutes(queueTime.getMinutes() + 10);

    const message = req.body.message;
    const media = req.file.filename;
    const schedule = queueTime;
    const status = "onQueue";
    const user_id = req.body.user_id;
    const post = new Post(message, media, schedule, status, user_id);
    post
        .save()
        .then(result => {
            res.redirect('/dashboard');
        })
        .catch(err => {
            res.render('error', {
                error: err
            });
        });
}

exports.createPostScheduled = (req, res, next) => { 
    const tempDate = req.body.postDate;
    const tempTime = req.body.postTime;
    const tempDateTime = tempDate + "T" + tempTime;
    console.log(tempDateTime);
    process.env.TZ;
    const fullDate = new Date(tempDateTime);
    console.log('fulldate ' + fullDate);
    const message = req.body.message;
    console.log(message);
    const media = req.file.filename;
    console.log(media);
    const schedule = fullDate;
    const status = "onQueue";
    const user_id = req.body.user_id;
    const post = new Post(message, media, schedule, status, user_id);
    post
        .save()
        .then(result => {
            programarPost(req.cookies.twitterAuth, message, media)
            res.redirect('/dashboard');
        })
        .catch(err => {
            res.render('error', {
                error: err
            });
        });
}

const programarPost= (cookie, caption, image) => {
    Post.getLastPost((err, data) => {
        var day = data[0].day;
        var month = data[0].month;
        var hour = data[0].hour;
        var minute = data[0].minute;
        console.log(`${hour} ${minute} ${day} ${month}`);
        cron.schedule(`${minute} ${hour} ${day} ${month} *`, () => {
            console.log('ejecutado')
            tweet(cookie,caption, image);
            cambiarEstado(data[0].id)
        });
    })
}

const cambiarEstado =(id) => {
    var status = 'Sent'
    Post.updateStatus(status,id,(res) => {
        console.log(res);
    });

}

exports.createPostNow = (req, res, next) => {
    const day = new Date();
    const schedule = day;
    const status = "Sent";
    const message = req.body.message;
    console.log(message);
    const media = req.file.filename;
    console.log(media);
    const user_id = req.body.user_id;
    const post = new Post(message, media, schedule, status, user_id);
    post
        .save()
        .then(result => {
            tweet(req.cookies.twitterAuth, message, media)
            res.redirect('/dashboard');
        })
        .catch(err => {
            res.render('error', {
                error: err
            });
        });
}



exports.delete = (req, res, next) => {
    Post.delete(req.params.id,(res)=> console.log(res))
    res.redirect('/dashboard');
}

exports.edit = (req, res, next) => {
    Post.findById(req.params.id, (err, data) => {
        console.log(data);
        res.render('post/edit', { data: data })
    })

}


const tweet = async (cookie, caption, image) => {
    if (cookie) {
        const { accToken, accSecret } = auth.twitterCredentials(cookie);
        const userTwitterClient = twitterClient.tempClient(accToken, accSecret);
        
        try {
            const mediaId = await userTwitterClient.v1.uploadMedia(image);
            await userTwitterClient.v1.tweet(caption), { media_ids: mediaId }
            .then((res) => console.log('Respuesta de promesa ' + res))
            .catch((err) => console.log('Error de promesa ' + err.message))
            console.log('nada')
        } catch (error) {
            console.log('Error de catch ' + error);
        }
    }
  

}




