//Esto son todas las dependencias lo que necesita la app para abir 
const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const flash = require('connect-flash');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


const RutaLogin = require('./routes/RutaLogin');
const RutaRegistro = require('./routes/RutaRegistro');
const RutaPerfil = require('./routes/RutaPerfil');
const RutaController = require('./routes/RutaController');


//const webRoutes = require('./routes/rutes');

//aquis define que usa express y se le pasa el puerto
const app = express();
app.set('port', 4000);
module.exports = app;

//Aqui se le define donde estan instaladas las dependencias
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//aqui se le pasa los modelos de la vistas que son de tipo hbs
app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
 
}));
app.set('view engine', 'hbs');


//aqui se le pasa la base de datos que vamos a utilizar para nuestro proyecto
try {
  app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'jcaf2723.',
    port: 3306,
    database: 'prueba'
  }, 'single'));
} catch (error) {
  // Aquí puedes manejar el error como quieras, por ejemplo:
  console.log(error); // Muestra el error por consola
  res.send({success: false, message: 'Error al conectar con la base de datos'}); // Envía una respuesta al cliente con el mensaje de error
}


//Crea una sesión usando express-session con una clave secreta y opciones de guardado.
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// Definir el middleware para verificar si el usuario está logueado
function requireLogin(req, res, next) {
  if (req.session && req.session.loggedin) {
    return next();
  } else {
    res.redirect('/login');
  }
}

//Esto es para que me pueda utilizar las plantillas de forma estatica.
app.use(express.static(path.join(__dirname, 'public')));

//Aqui se le pasa el puerto de escucha de la app para poder cargarlo en el sevidor.
app.listen(app.get('port'), () => {
  console.log('Se ha iniciado el servidor en el puerto: ', app.get('port'));
});

//FLASH
app.use(flash());

//variables


//esto permite usar las rutas generadas por las controladoras
app.use('/', RutaLogin);
app.use('/', RutaRegistro);
app.use('/', RutaPerfil);
app.use('/', RutaController);

//Middle
// Middleware para agregar el objeto usuario a la respuesta
app.use((req, res, next) => {
  if (req.session.loggedin) {
    req.getConnection((err, conn) => {
      if (err) {
        return res.status(500).json({ error: err.message }); // Manejar el error de conexión
      }

      conn.query('SELECT nombre, apellidos, usuario, correo, fecha_inicio, fecha_nacimiento, sexo, edad, facultad, deporte FROM usuario WHERE usuario = ?', [req.session.usuario], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message }); // Manejar el error de consulta
        }

        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const fechaInicio = new Date(result[0].fecha_inicio);
        const fechaNacimiento = new Date(result[0].fecha_nacimiento);

        res.locals.usuario = {
          usuario: req.session.usuario,
          nombre: result[0].nombre,
          apellidos: result[0].apellidos,
          correo: result[0].correo,
          sexo: result[0].sexo,
          edad: result[0].edad,
          facultad: result[0].facultad,
          deporte: result[0].deporte,
          fecha_inicio: fechaInicio.toLocaleDateString('es-ES', opciones).split('/').reverse().join('/'),
          fecha_nacimiento: fechaNacimiento.toLocaleDateString('es-ES', opciones).split('/').reverse().join('/')
        }; // Agregar el objeto usuario a la respuesta

        next();
      });
    });
  } else {
    next();
  }
});

//esto permite acceder a la pagina de bienvenida con el localhost/puerto
app.get('/', (req, res) => {
  
  res.render('welcome-page');
});

//Pagina de bienvenida
app.get('/welcome-page', (req, res) => {
  res.render('welcome-page');
});

//Registro
app.get('/registrar', (req, res) => {
  res.render('registrar');
});

//login
app.get('/iniciar-sesion', (req, res) => {
  res.render('iniciar-sesion');
});

//Princial
app.get('/principal', (req, res) => {
  if (req.session.loggedin) {
    res.render('principal', { usuario: res.locals.usuario });
  } else {
    res.redirect('iniciar-sesion');
  }
});
 

//Datos fisicos
app.get('/datos-fisicos', (req, res) => {
  res.render('datos-fisicos',{ usuario: res.locals.usuario });
});

//Grupos
app.get('/amigos', (req, res) => {
  res.render('amigos',{ usuario: res.locals.usuario });
});

//Perfil
app.get('/profile', requireLogin,(req, res) => {
   res.render('profile', { usuario: res.locals.usuario });
});

//editar Perfil
app.get('/edit-profile',requireLogin,(req, res) => {
  res.render('edit-profile', { usuario: res.locals.usuario });
});


//Rutina
app.get('/rutina', (req, res) => {
  res.render('rutina', { usuario: res.locals.usuario });
});

//Tablas
app.get('/table', (req, res) => {
  res.render('table', { usuario: res.locals.usuario });
});

//crear Rutinas
app.get('/crear-rutina', (req, res) => {
  res.render('crear-rutina');
});










