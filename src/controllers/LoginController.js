const bcrypt = require('bcrypt');


function login(req, res){
    if(req.session.loggedin != true){

    res.render('iniciar-sesion');

    } else {
         res.redirect('principal');
    }
}

//autentica a un usuario comprobando su nombre de usuario y contraseña contra una base de datos y 
//luego establece una variable de sesión y lo redirige a la página principal si son válidos, o muestra
//un mensaje de error si no lo son.
function autenticar(req, res){
      const data = req.body;
      req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuario WHERE Usuario = ?', [data.usuario], (err, userdata) =>{

            if(userdata.length > 0) {
                
                userdata.forEach(element => {
                bcrypt.compare(data.contrasena, element.contrasena, (err, isMatch) => {

                    

                        if(!isMatch){
                            res.render('iniciar-sesion', {error: 'Error: Contraseña Incorrecta !'});
                        } else {
                            
                          req.session.loggedin = true;
                          req.session.usuario = element.usuario;

                          res.redirect('principal')

                        }                        
                        
                    });
                });

            } else {
                res.render('iniciar-sesion', {error: 'Error: El usuario no existe !'});

            }

        });
    });         
}


function logout(req, res){

    if(req.session.loggedin == true){
  
      req.session.destroy();
    }
  
    res.redirect('/');
  
  }


  module.exports = {

    login,
    autenticar,
    logout,

}