var con = require('../util/database');

class Schedule{
    constructor( day, time, id ){
        this.day = day;
        this.time = time;
        this._id = id;
    }

    static getAll = (funcion) =>{
        con.query("SELECT id, date_format(day, '%W ') as 'day', time_format(time, '%H : %i') as time FROM schedule order by day",
        funcion);
    }

    save=() =>{
        
        console.log(this.day + ' ' + this.time + ' ')
        con.query("INSERT INTO schedule (day, time) VALUES (?, ?)", [this.day, this.time]);
    }

    static delete=(id) =>{
        con.query("DELETE FROM schedule WHERE id = ?", [id]);
    }
}

module.exports = Schedule;