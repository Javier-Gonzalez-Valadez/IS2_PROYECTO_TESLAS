var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //traemos a la biblioteca mongoose, para que nos recuperer la conexion a la BD

var Auto = require('../modelos/autos'); //nos vamos a traer el modulo con el modelos declarado (objeto automovil)

/*Read - GET (sin where)*/
router.get('/', (req, res, next) => {
  Auto.find({}, (err, datos) => {

    if (err) {
      res.json({'error' : 'Ocurrio al realizar la consulta'});
    } else {
      res.status(200).json(datos);
    }

  });

});

/*Read - GET (con where)*/
router.get('/:idAuto', (req, res, next) => {
  Auto.findOne({'id':req.params.idAuto}, (err, datos) => {

    if (err) {
      res.json({'error' : 'El id no existe'});
    } else {
      res.status(200).json(datos);
    }

  });

});

/*Metodo Insert - POST */
router.post('/', (req, res, next) => {
 var auto = Auto({
  id : req.body.id,
  marca : req.body.marca,
  modelo : req.body.modelo,
  tipoDeDiseno : req.body.tipoDeDiseno,
  tipoMotor : req.body.tipoMotor, 
  numeroPlazas : req.body.numeroPlazas
 });

 auto.save((err, data) => {
   if (err) {// si la BD devuelve un error entonces "err == null"
     res.json({'error':"Error al insertar"});
   } else { //si todo salio bien 
    console.log(data);
    res.status(200).json( data );
   }
 });

});


/*delete - con WHERE*/
router.delete('/:idAuto', (req, res, next) => {
  Auto.deleteOne({'id':req.params.idAuto}, (err) => {
    if (err) {
      res.send("<img src=\"https://http.cat/404\">");
    } else {
      res.json({'mensaje':'OK'});
    }
  });

});

/*delete - sin WHERE*/
router.delete('/', (req, res, next) => {
  Auto.deleteMany({ }, (err) => {
    if (err) {
      res.json({'mensaje':'No fue posible elminar los registros'});
    } else {
      res.json({'mensaje':'Se han eleminado todos los registros'});
    }
  });

});




/*
Update - PATCH 
Se utiliza para actualizar solo una pequeña parte de un registro existente
*/
router.patch('/:idAuto', (req, res, next) => {
  
  Auto.updateOne({'id':req.params.idAuto}, req.body,(err) => {
    if (err) {
      res.json({'mensaje':'Error al actualizar registro'});
    } else {
      res.json({'mensaje':'Registro actualizado satisfactoriamente'});
    }
  });

  
});


/*
Update - PUT 
Se utiliza para actualizar total o parcialmente un registro existente.
NOTA: debes utilizar el id con codigo HASH que asigna Mongo DB a cada registro
de lo contrario no realizara ningun cambio
*/
router.put('/:idAuto', (req, res) => {
  var Autoid = req.params.idAuto;
  var bodyAuto = req.body;
  console.log("Body: ", bodyAuto);
  console.log("id:", Autoid);

  
  Auto.findByIdAndUpdate(Autoid, bodyAuto, (err, AutoUpdate) => {
    if (err) {
      res.status(404).json({'mensaje':'No se fue posible realizar la actualizacion'});
    } else {
      res.status(200).send({'Auto actualizado':AutoUpdate});
    }
  });

});

module.exports = router;
