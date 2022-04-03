var Schedule = require('../models/schedule');

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
    res.render('schedule/create');
}

exports.save = (req, res, next) =>{
    const day = req.body.day;
    const time = req.body.time;
    const schedule = new Schedule(day, time) 
    schedule.save();
}

exports.delete = (req, res, next) =>{
    Schedule.delete(req.params.id);
    res.redirect('/schedule/schedule');
    console.log('delete');
}