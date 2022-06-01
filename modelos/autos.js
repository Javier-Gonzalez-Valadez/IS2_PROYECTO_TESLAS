var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var AutoSchema = Schema ({
    id: Number,
    marca : String,
    modelo : Number,
    tipoDeDiseno : String,
    tipoMotor : String, 
    numeroPlazas : String
});  

module.exports = mongoose.model('Auto' , AutoSchema);