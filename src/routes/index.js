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

router.get('/pendientes', (req, res) => {
  res.render('pendientes.html', { title: "" });
});

//Rutas de los métodos de la base de datos
router.post('/solicitudes/agregar_solicitud/nuevo_cliente', async (req, res) => {
  try {
    let { nombre_fc, domicilio_fc, telefono_fc, servicio_fc, fecha_fc, hora_fc } = req.body;
    let tipo_solicitud = "Nuevo cliente";
    fecha_fc = fecha_fc.replace("/", "-");
    fecha_fc = fecha_fc.replace("/", "-");
    fecha_fc = fecha_fc.split("-").reverse().join("-");
    hora_fc = hora_fc.concat(':00');

    let query =`CALL sp_agregar_solicitud_cliente_nuevo(
      '${fecha_fc}',
      '${hora_fc}',
      '${tipo_solicitud}',
      '${servicio_fc}',
      '${nombre_fc}',
      '${domicilio_fc}',
      '${telefono_fc}'
    )`

    console.log(query);
    let resultado = await pool.query(query);
    return resultado;
  } catch (error) {
    throw error;
  }
  
});

//Rutas de los métodos de la base de datos
router.post('/solicitudes/agregar_solicitud/nuevo_inmueble', async (req, res) => {
  try {
    let { nombre_fi, domicilio_fi, telefono_fi, servicio_fi, fecha_fi, hora_fi } = req.body;
    let tipo_solicitud = "Nuevo inmueble";
    fecha_fi = fecha_fi.replace("/", "-");
    fecha_fi = fecha_fi.replace("/", "-");
    fecha_fi = fecha_fi.split("-").reverse().join("-");
    hora_fi = hora_fi.concat(':00');

    let query =`CALL sp_agregar_solicitud_cliente(
      '${fecha_fi}',
      '${hora_fi}',
      '${tipo_solicitud}',
      '${servicio_fi}',
      '${nombre_fi}',
      '${domicilio_fi}',
      '${telefono_fi}'
    )`

    console.log(query);
    let resultado = await pool.query(query);
    return resultado;
  } catch (error) {
    throw error;
  }
  
});

//Rutas de los métodos de la base de datos
router.post('/solicitudes/agregar_solicitud/nuevo_servicio', async (req, res) => {
  try {
    let { nombre_fs, domicilio_fs, servicio_fs, fecha_fs, hora_fs } = req.body;
    let tipo_solicitud = "Nuevo servicio";
    fecha_fs = fecha_fs.replace("/", "-");
    fecha_fs = fecha_fs.replace("/", "-");
    fecha_fs = fecha_fs.split("-").reverse().join("-");
    hora_fs = hora_fs.concat(':00');

    let query =`CALL sp_agregar_solicitud_cliente(
      '${fecha_fs}',
      '${hora_fs}',
      '${tipo_solicitud}',
      '${servicio_fs}',
      '${nombre_fs}',
      '${domicilio_fs}'
    )`
    console.log(query);
    let resultado = await pool.query(query);
    return resultado;
  } catch (error) {
    throw error;
  }
  
});

//Rutas de los métodos de la pestaña de pendientes
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
    throw error;
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
    throw error;
  }
});

router.get('/pendientes/mantenimiento', (req, res) => {
  try {
    let query = "SELECT * FROM solicitud_pendiente WHERE BINARY servicio = 'ASDASD'";
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
    throw error;
  }
});

router.get('/solicitudes/nombre_clientes', (req, res) => {
  try {
    let query = 'SELECT CONCAT(c.nombre," ",c.apellido_p," ",c.apellido_m)as nombre, id_cliente FROM cliente c';
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
    throw error;
  }
});

router.get('/solicitudes/domicilio_clientes', (req, res) => {
  try {
    let query = 'SELECT CONCAT(calle," ",numero_exterior," ",colonia)as domicilio FROM inmueble i';
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
    throw error;
  }
});

module.exports = router;
