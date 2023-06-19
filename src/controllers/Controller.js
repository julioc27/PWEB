const express = require('express');


function crearrutina(req, res){
  if(req.session.loggedin != true){
  
      res.render('crear-rutina');
  
      } else {
           res.redirect('principal');
      }
}

function tablaUser(req, res){
  if(req.session.loggedin != true){
  
      res.render('crear-rutina');
  
      } else {
           res.redirect('principal');
      }
}

function amigosA(req, res){
  if(req.session.loggedin != true){
  
      res.render('amigos');
  
      } else {
           res.redirect('principal');
      }
}

function amigos(req, res) {
  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return;
    }

    conn.query('SELECT * FROM usuario', (err, rows) => {
      if (err) {
        console.error('Error al obtener los usuarios:', err.message);
        res.json(err);
      } else {
        res.render('table',{ usuario: rows });
        console.log(rows)
      }
    });
  });
}
  
function seguir(req, res) {
  const usuario = req.session.usuario;
  const amigo = req.params.usuario; // asumiendo que el ID del amigo está en el parámetro de ruta llamado "usuario"

  const db = req.getConnection();

  if (usuario === amigo) {
    res.redirect('/profile');
  } else {
    db.query('INSERT INTO seguidos (usuario, amigo) VALUES (?, ?)', [usuario, amigo], function(err) {
      if (err) {
        console.error('Error al seguir al amigo:', err.message);
        res.json(err);
      } else {
        console.log(`Usuario ${usuario} ahora sigue al amigo ${amigo}`);
        res.redirect('/amigos');
      }
    });
  }
}

  function generarTabla(req, res) {
    const diaInicio = req.body.dia_inicio;
    const numDias = req.body.num_dias;
    const opcion = req.body.opcion;
    const usuario = req.session.usuario;
    console.log(usuario);
  
    req.getConnection((err, conn) => {
      if (err) {
        console.error(err);
        return;
      }
      // inserta la información del formulario en la tabla
      conn.query(`INSERT INTO tabla_dias (usuario, dia_inicio, num_dias, opcion) VALUES (?, ?, ?, ?)`, [usuario, diaInicio, numDias, opcion], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error al insertar la rutina');
        }
        console.log(`Se ha insertado una nueva fila con el ID ${result.insertId}`);
    
        // redirige al usuario a la página de tabla generada
        res.redirect('/rutina');
      });
    });
  }
  
  //funcion para cargar la tabla de Rutina
  function cargarTabla(req, res) {
    const usuario = req.session.usuario;
    console.log(usuario);
  
    req.getConnection((err, conn) => {
      if (err) {
        console.error(err);
        return;
      }
  
      conn.query(`SELECT * FROM tabla_dias WHERE usuario = ?`, [usuario], (err, rows) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Error al obtener los datos de la base de datos');
        }
  
        const dias = [];
  
        // Obtener los días de la semana a partir del día de inicio y el número de días
        if (rows.length > 0) {
          const dia_inicio = rows[0].dia_inicio;
          const num_dias = rows[0].num_dias;
          const dias_semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
          const dia_inicio_index = dias_semana.indexOf(dia_inicio);
  
          for (let i = 0; i < num_dias; i++) {
            const dia_index = (dia_inicio_index + i) % 7;
            dias.push(dias_semana[dia_index]);
          }
        }
  
        // Renderizar la plantilla con los datos de la tabla
        res.render('rutina', { dias: dias, rows: rows });
        console.log(dias,rows)
      });
    });
  }



  module.exports = {

    amigos,
    seguir,
    generarTabla,
    cargarTabla,
    crearrutina,
    tablaUser,
    amigosA,

}