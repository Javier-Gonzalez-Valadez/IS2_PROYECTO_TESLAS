var mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://userTesla:tesla@cluster0.c1vqi.mongodb.net/automovil?retryWrites=true&w=majority'
, {useNewUrlParser : true
}).then(()=>{console.log('Conectado a Mondo DB - Equipo Tesla')})
.catch(err => console.log(err));
