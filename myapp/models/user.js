module.exports ={
    
    getAll(conexion, funcion) {
        conexion.query("SELECT * FROM users", funcion);
    },

    guardar(conexion, datos, funcion) {
        conexion.query("INSERT INTO users (name,email,password) VALUES(?,?,?)", [datos.name, datos.email, datos.password])
    }
}