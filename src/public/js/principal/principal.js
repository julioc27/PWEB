function confirmarCerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar la sesión?')) {
      cerrarSesion();
    }
  }
  
  function cerrarSesion() {
    // Aquí puedes agregar el código para cerrar la sesión del usuario, como borrar el token de autenticación o eliminar la sesión del servidor.
    // Luego redirecciona al usuario a la página de inicio de sesión o a cualquier otra página que desees.
    window.location.href = '/logout';
  }