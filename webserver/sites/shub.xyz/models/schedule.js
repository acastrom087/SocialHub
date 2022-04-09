var con = require('../util/database');

class Schedule{
    constructor( date, id ){
        this.date = date;
        this._id = id;
    }

    static getAll = (funcion) =>{
        con.query("SELECT id, date_format(date, '%W') as 'day', time_format(date, '%H : %i') as hour FROM socialhub.schedule order by day",
        funcion);
    }

    save=(funcion) =>{  
        if(this._id == " "){
            con.query("INSERT INTO schedule (date) VALUES (?)", [this.date],funcion);
        }else{
            con.query("UPDATE schedule set date = ? WHERE id = ?", [this.date,  this._id],funcion);
        }
        }
                   

    static delete=(id, funcion) =>{
            con.query("DELETE FROM schedule WHERE id = ?", [id], funcion);
            
    }

    static findById = (id, funcion) =>{
        //con.query("SELECT id, date_format(date, '%d/%m/%Y %H:%i') as 'date' FROM socialhub.schedule  WHERE id = ?", [id], funcion)
        con.query("SELECT id, date FROM socialhub.schedule  WHERE id = ?", [id], funcion)
    }
}

module.exports = Schedule;