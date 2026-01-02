let mensajesLeidos = parseInt(localStorage.getItem('mensajesLeidos') || '0');
let diaActual = 1;
const fechaInicio = new Date(2026, 0, 1, 0, 0, 0, 0); // 1 de enero de 2026 a las 00:00:00

function abrirLibro() {
  document.getElementById('libro').classList.add('abierto');
  calcularDiaActual();
  mostrarDia(diaActual);
  
  if (diaActual <= getDiaActualDesbloqueado()) {
    mensajesLeidos++;
    localStorage.setItem('mensajesLeidos', mensajesLeidos);
  }
  document.getElementById('mensajes-leidos').textContent = mensajesLeidos;
  
  // Reproducir música de fondo
  const musica = document.getElementById('musica-fondo');
  musica.volume = 0.3; // Volumen al 30%
  musica.play().catch(error => {
    console.log('La música se reproducirá al interactuar con la página');
  });
}

function cerrarLibro() {
  document.getElementById('libro').classList.remove('abierto');
  
  // Pausar música de fondo
  const musica = document.getElementById('musica-fondo');
  musica.pause();
  musica.currentTime = 0; // Reiniciar al inicio
}

function toggleMusica() {
  const musica = document.getElementById('musica-fondo');
  const boton = document.getElementById('btn-musica');
  
  if (musica.paused) {
    musica.play();
    boton.textContent = '🔊';
  } else {
    musica.pause();
    boton.textContent = '🔇';
  }
}

function cambiarVolumen(valor) {
  const musica = document.getElementById('musica-fondo');
  musica.volume = valor / 100;
}

function calcularDiaActual() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  
  const diferenciaTiempo = hoy.getTime() - fechaInicio.getTime();
  const diasTranscurridos = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
  
  diaActual = diasTranscurridos + 1;
  
  if (diaActual < 1) diaActual = 1;
  if (diaActual > 365) diaActual = 365;
}

function getDiaActualDesbloqueado() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  
  const diferenciaTiempo = hoy.getTime() - fechaInicio.getTime();
  const diasTranscurridos = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
  
  let dia = diasTranscurridos + 1;
  
  if (dia < 1) return 1;
  if (dia > 365) return 365;
  return dia;
}

function cambiarDia(direccion) {
  const nuevoDia = diaActual + direccion;
  if (nuevoDia >= 1 && nuevoDia <= 365) {
    diaActual = nuevoDia;
    mostrarDia(diaActual);
  }
}

function obtenerFechaDia(numDia) {
  const fecha = new Date(fechaInicio.getTime());
  fecha.setDate(fecha.getDate() + numDia - 1);
  return fecha;
}

function mostrarDia(numDia) {
  const diaDesbloqueado = getDiaActualDesbloqueado();
  const fechaDia = obtenerFechaDia(numDia);
  
  const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
  const fechaFormateada = fechaDia.toLocaleDateString('es-ES', opciones);
  
  document.getElementById('fecha-hoy').textContent = `Día ${numDia} - ${fechaFormateada}`;
  document.getElementById('indicador-dia').textContent = `Día ${numDia} de 365`;
  document.getElementById('dia-numero').textContent = numDia;
  
  // Actualizar botones de navegación
  document.querySelector('.btn-nav:first-child').disabled = numDia === 1;
  document.querySelector('.btn-nav:last-child').disabled = numDia === 365;
  
  if (numDia <= diaDesbloqueado) {
    // Día desbloqueado - mostrar mensaje
    document.getElementById('carta-diaria').innerHTML = mensajes[numDia - 1] || mensajes[0];
    document.getElementById('carta-diaria').className = '';
  } else {
    // Día bloqueado
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaDesbloqueo = obtenerFechaDia(numDia);
    
    const diferenciaTiempo = fechaDesbloqueo.getTime() - hoy.getTime();
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
    
    let tiempoTexto;
    if (diferenciaDias === 0) {
      tiempoTexto = "hoy mismo";
    } else if (diferenciaDias === 1) {
      tiempoTexto = "mañana";
    } else if (diferenciaDias < 7) {
      tiempoTexto = `${diferenciaDias} días`;
    } else if (diferenciaDias < 30) {
      const semanas = Math.floor(diferenciaDias / 7);
      const dias = diferenciaDias % 7;
      tiempoTexto = `${semanas} ${semanas === 1 ? 'semana' : 'semanas'}${dias > 0 ? ` y ${dias} ${dias === 1 ? 'día' : 'días'}` : ''}`;
    } else if (diferenciaDias < 365) {
      const meses = Math.floor(diferenciaDias / 30.44);
      const dias = Math.floor(diferenciaDias % 30.44);
      tiempoTexto = `${meses} ${meses === 1 ? 'mes' : 'meses'}${dias > 0 ? ` y ${dias} ${dias === 1 ? 'día' : 'días'}` : ''}`;
    } else {
      tiempoTexto = "más de un año";
    }
    
    document.getElementById('carta-diaria').className = 'bloqueado';
    document.getElementById('carta-diaria').innerHTML = `
      Esta página aún está bloqueada<br><br>
      <div class="tiempo-restante">Se desbloqueará: ${tiempoTexto}</div>
      <br>
      <small>Fecha de desbloqueo: ${fechaDesbloqueo.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</small>
    `;
  }
}

// Cargar estadísticas al inicio
document.getElementById('mensajes-leidos').textContent = mensajesLeidos;