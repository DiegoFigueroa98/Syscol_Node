const express = require('express');
const router = express.Router();

const pool = require('../database');

//Rutas del menú de navegación
router.get('/', (req, res) => {
  res.render('index.html', { title: 'pendiente' });
});

router.get('/inicio', (req, res) => {
  res.render('index.html', { title: 'pendiente' });
});

router.get('/solicitudes', (req, res) => {
  res.render('solicitudes.html', { title: 'pendiente' });
});

router.get('/orden_trabajo', (req, res) => {
  res.render('orden_trabajo.html', { title: 'pendiente' });
});

router.get('/monitoreo', (req, res) => {
  res.render('monitoreo.html', { title: 'pendiente' });
});

router.get('/cobranza', (req, res) => {
  res.render('cobranza.html', { title: 'pendiente' });
});

router.get('/reportes', (req, res) => {
  res.render('reportes.html', { title: 'pendiente' });
});

//Rutas de los métodos de la base de datos
router.post('/solicitudes/agregar_solicitud/cliente_nuevo', async (req, res) => {
  try {
    let { nombre_fc, domicilio_fc, telefono_fc, servicio_fc, fecha_fc, hora_fc } = req.body;
    fecha_fc = fecha_fc.replace("/", "-");
    fecha_fc = fecha_fc.replace("/", "-");
    fecha_fc = fecha_fc.split("-").reverse().join("-");
    hora_fc = hora_fc.concat(':00');

    let query =`insert into solicitud_pendiente
    (nombre_completo,domicilio,telefono,servicio,fecha_visita,hora_visita)
    value(
      '${nombre_fc}',
      '${domicilio_fc}',
      '${telefono_fc}',
      '${servicio_fc}',
      '${fecha_fc}',
      '${hora_fc}'
    )`
    await pool.query(query);
    return 0;
  } catch (error) {
    console.log(error);
  }
  
});

router.get('/pendientes', (req, res) => {
    res.render('pendientes.html', { title: "" });
});

router.get('/pendientes/instalacion', (req, res) => {
  try {
    let query = "SELECT * FROM solicitud_pendiente WHERE servicio = 'asdasd'";
    pool.query(query, function (err,rows) {
      if(err){
        res.json({
          error: true,
          message: err.message
        })
      } else {
        console.log(rows);
        res.json({
          error: false,
          message: 'OK',
          data: rows
        })
      }
    })
  } catch (error) {
    console.log(error);
  }
});

router.get('/pendientes/monitoreo', (req, res) => {
  try {
    let query = "SELECT * FROM solicitud_pendiente WHERE servicio = 'asd'";
    pool.query(query, function (err,rows) {
      if(err){
        res.json({
          error: true,
          message: err.message
        })
      } else {
        console.log(rows);
        res.json({
          error: false,
          message: 'OK',
          data: rows
        })
      }
    })
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
