var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//conexion a la BD
var mongoose = require ('mongoose');
mongoose.connect('mongodb+srv://userTesla:tesla@cluster0.c1vqi.mongodb.net/automovil?retryWrites=true&w=majority'
, {useNewUrlParser : true
}).then(()=>{console.log('Conectado a Mondo DB - Equipo Tesla')})
.catch(err => console.log(err));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var equipoRouter = require('./routes/equipo');
var dockerRouter = require('./routes/docker');
var imagenesRouter = require('./routes/imagenes');
var contenedoresRouter = require('./routes/contenedores');
var dockerfilesRouter = require('./routes/dockerfiles');
var directivasdockerfileRouter = require('./routes/directivasdockerfile');
var ciclovidaRouter = require('./routes/ciclovida');

var autosRouter = require('./routes/autos');//controlador de rutas del EndPoint autos


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/equipo', equipoRouter);
app.use('/docker', dockerRouter);
app.use('/imagenes', imagenesRouter);
app.use('/contenedores', contenedoresRouter);
app.use('/dockerfiles', dockerfilesRouter);
app.use('/directivasdockerfile', directivasdockerfileRouter);
app.use('/ciclovida', ciclovidaRouter);
app.use('/autos',autosRouter);// /autosRouter va hacer  la APIREST y el controlador es autosRouter


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
