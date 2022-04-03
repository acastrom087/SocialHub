var Schedule = require('../models/schedule');

exports.getAll = (req, res, next) =>{

    schedule.getAll(function(err,data){
        //console.log(data);
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
    const day = req.params.day;
    const time = req.params.time;
    const schedule = new Schedule(day, time)
    //console.log(req.body);
    schedule.save(function(err,data){
        console.log(data);
        console.log(err);
    })
}