var mongoose = require('mongoose') ;

mongoose.connect('mongodb://localhost:27017/messengerDB',{
    useNewUrlParser: true , 
    useUnifiedTopology :true 
}) ;
 