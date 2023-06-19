const bcrypt = require('bcrypt');

function registro(req, res){
    if(req.session.loggedin != true){

        res.render('registrar');
    
        } else {
             res.redirect('principal');
        }
}

function Registrar(req, res){
    const data = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuario WHERE correo = ? OR usuario = ?', [data.correo, data.usuario], (err, userdata) =>{
            if(userdata.length > 0) {
                res.render('registrar', {error: 'Error: El usuario ya existe !'});
            } else {
 
                bcrypt.hash(data.contrasena, 12).then(hash =>{  
                    data.contrasena = hash;
                    
                    req.getConnection((err, conn) => {
                      conn.query('INSERT INTO usuario SET ?, fecha_inicio = NOW()', [data], (err, rows) => {
                        
                        req.session.loggedin = true;
                        req.session.usuario = data.usuario;

                        res.redirect('iniciar-sesion');
                      })
                    })      
                    })
            }
        })
    })
}

module.exports = {

    registro,
    Registrar,

}