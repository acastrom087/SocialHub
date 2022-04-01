var con = require('../database/conexion');
var user = require('../models/user');

module.exports ={

    index:(req, res, next) =>{
        user.getAll(con, (err,datos)=>{
            console.log(datos);
            res.render('index',{prueba:'prueba',users:datos});
        })
    },


    crear:(req, res, next) =>{
        res.render('registro')
    },

    guardar:(req, res, next) =>{
        console.log(req.body)
        user.guardar(con, req.body,(err)=>{
             res.redirect('/index');
        })
    }
}

