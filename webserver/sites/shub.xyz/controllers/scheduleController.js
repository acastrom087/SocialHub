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
    res.render('schedule/create', {data: null});
}

exports.save = (req, res, next) =>{
    const id = req.body.id
    const date = req.body.date;
    const schedule = new Schedule(date, id); 
    console.log(date,id);
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
        res.render('schedule/create', {data: data})
    })
   
}



