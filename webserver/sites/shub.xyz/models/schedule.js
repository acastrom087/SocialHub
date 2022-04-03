var con = require('../util/database');

class schedule{
    constructor(id, day, time){
        this.id = id;
        this.day = day;
        this.time = time;
    }

    static getAll(funcion){
        con.query("SELECT date_format(day, '%W de %M del %Y') as 'day', time_format(time, '%H : %i') as time FROM schedule order by day",
        funcion);
    }

    save(funcion){
        console.log(this.day + ' ' + this.time + ' ')
        con.query("INSERT INTO schedule (day, time) VALUES (?, ?)", [this.day, this.time]);
    }
}

module.exports = schedule;