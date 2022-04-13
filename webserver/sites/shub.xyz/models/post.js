var con = require('../util/database');

class post{
    constructor( date, image, description, id ){
        this.date = date;
        this.image = image;
        this.description = description;
        this._id = id;
    }

    static getAll = (funcion) =>{
        con.query("SELECT id, date_format(date, '%W') as 'day', time_format(date, '%H : %i') as hour, image FROM socialhub.posts order by day",
        funcion);
    }

    
    save=(funcion) =>{  
        
            con.query("INSERT INTO posts (date, image, description) VALUES (?,?,?)", [this.date, this.image, this.description],funcion);
       
            //con.query("UPDATE posts set date = ? WHERE id = ?", [this.date,  this._id],funcion);
        
        
    }               

    static delete=(id, funcion) =>{
            con.query("DELETE FROM posts WHERE id = ?", [id], funcion);
            
    }

    static findById = (id, funcion) =>{
        //con.query("SELECT id, date_format(date, '%d/%m/%Y %H:%i') as 'date' FROM socialhub.posts  WHERE id = ?", [id], funcion)
        con.query("SELECT id, date, image, description FROM socialhub.posts  WHERE id = ?", [id], funcion)
    }
}

module.exports = post;