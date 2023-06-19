const { query } = require("express");
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


function modificarPerfil(req, res){
    if(req.session.loggedin != true){

        res.render('edit-profile');
    
        } else {
             res.redirect('principal');
        }
}

function updatePerfil(req, res) {
  const userId = req.session.usuario;
  const data = req.body;

  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return;
    }

    // Obtener los datos actuales del usuario
    conn.query('SELECT * FROM usuario WHERE usuario = ?', [userId], (err, rows) => {
      if (err) {
        console.error(err);
        return;
      }

      const currentData = rows[0];

      // Verificar si el usuario actual es el propietario de los datos que se están actualizando
      if (currentData.usuario !== userId) {
        console.error('El usuario actual no tiene permiso para actualizar estos datos');
        return;
      }

      // Comparar cada campo y actualizar solo los que han cambiado
      const newData = {};
      Object.keys(data).forEach(key => {
        if (data[key] !== currentData[key] && data[key] !== "") {
          newData[key] = data[key];
        }
      });

      // Si no hay cambios, redirigir directamente a la página de perfil
      if (Object.keys(newData).length === 0) {
        res.redirect('/profile');
        return;
      }

      // Si se modificó la fecha de nacimiento, calcular la edad y actualizarla en la base de datos
      if (newData.fecha_nacimiento) {
        const fechaNacimiento = new Date(newData.fecha_nacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
          edad--;
        }
        newData.edad = edad;
      }

      // Actualizar los campos que han cambiado
      conn.query('UPDATE usuario SET ? WHERE usuario = ?', [newData, userId], (err, rows) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Se actualizaron ${rows.affectedRows} filas`);

        // Actualizar la edad en la base de datos si se modificó la fecha de nacimiento
        if (newData.edad) {
          conn.query('UPDATE usuario SET edad = ? WHERE usuario = ?', [newData.edad, userId], (err, rows) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(`Se actualizó la edad a ${newData.edad} años`);
          });
        }

        // Verificar si se modificó algún dato que afecte la sesión del usuario
        if (newData.usuario || newData.correo || newData.contrasena) {
          // Destruir la sesión actual para cerrar la sesión del usuario
          req.session.destroy((err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Sesión cerrada');
            res.redirect('/logout');
          });
        } else {
          // Redirigir al usuario a la página de perfil si no hubo cambios en los datos de la sesión
          res.redirect('/profile');
        }
      });
    });
  });
}


const cambiarFotoPerfil = (conexion, usuario, foto, callback) => {
  if (!foto.mimetype.startsWith('image/')) {
    return callback(new Error('El archivo seleccionado debe ser una imagen.'));
  }

  const extension = foto.name.split('.').pop();
  const rutaFoto = `public/fotos/${usuario}.${extension}`;

  foto.mv(rutaFoto, (err) => {
    if (err) {
      return callback(err);
    }

    conexion.query('UPDATE usuario SET foto = ? WHERE usuario = ?', [rutaFoto, usuario], (err, result) => {
      if (err) {
        return callback(err);
      }

      callback(null);
    });
  });
};

function cambiarFoto(req, res) {
  const usuario = req.session.usuario;

  if (!req.files || !req.files.foto) {
    return res.status(400).send('Debe seleccionar una foto para cambiar su foto de perfil.');
  }

  const foto = req.files.foto;

  const conexion = req.getConnection();

  cambiarFotoPerfil(conexion, usuario, foto, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.redirect('/profile');
  });
}









module.exports = {

    modificarPerfil,
    updatePerfil,
    cambiarFoto,
    
    
    

}