const Post = require('../models/post.js');
var cron = require('node-cron');
require('dotenv').config();


exports.createPost = (req, res, next) => {
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

exports.createPostNow = (message, media, user_id) => {
    const day = new Date();

    const schedule = day;
    const status = "Sent";
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

exports.save = (req, res, next) => {
    const id = req.body.id
    const date = req.body.date;
    const image = req.file.filename;
    const description = req.body.description;
    const post = new Post(date, image, description, id);
    post.save(function (err) {
        if (err) {
            console.log(err);
        } else {

            res.redirect('/post/post');
        }

    })

}

exports.delete = (req, res, next) => {
    Post.delete(req.params.id)
    res.redirect('/post/post');
}

exports.edit = (req, res, next) => {
    Post.findById(req.params.id, (err, data) => {
        console.log(data);
        res.render('post/edit', { data: data })
    })

}

exports.post = (req, res, next) => {
    var id = req.params.id;
    Post.findById(id, (err, data) => {
        var name = data[0].image;
        var name = data[0].description;
        loginInstagram(name, description);
    })
}

exports.prueba = (req, res, next) => {
    console.log('prueba')
    var fecha = new Date();
    var hora_actual = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getDay() + ':' + fecha.getMonth();
    console.log(hora_actual)
    Post.getLastPost(67, (err, data) => {
        var day = data[0].day;
        var month = data[0].month;
        var year = data[0].year;
        var hour = data[0].hour;
        var minute = data[0].minute;
        console.log(`${hour} ${minute} ${day} ${month}`);
        cron.schedule(`${minute} ${hour} ${day} ${month} *`, () => {
            console.log('running a task every minute');
        });
    })

}




