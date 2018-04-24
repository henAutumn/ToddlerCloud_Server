require('dotenv').config();

var express=require('express');
var app= express();
var user=require('./controllers/usercontroller');
var artlog=require('./controllers/artlogcontroller');
var cloudnote=require('./controllers/cloudnotecontroller')

var bodyParser=require('body-parser');
var sequelize=require('./db');
sequelize.sync();

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/api/user',user);
app.use(require('./middleware/validate-session'));
app.use('/api/artlog',artlog);
app.use('/api/cloudnote', cloudnote)



app.listen(3001, function(){
    console.log('App is listening on 3001')
})


 