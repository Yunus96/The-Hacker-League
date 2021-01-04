require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 1000;
const app = express();

//Setting view engine
app.set('view engine', 'ejs');

//tells to use static files
app.use(express.static('public'))

//import routes
const Routes = require('./routes/routes')
app.use('/', Routes)

//configuring mongoose to connect with mongodb
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser : true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', ()=> console.log("DB connected successfully"))

//Lets our server to accept json
app.use(express.json())
//lets our server accept urlparameter
app.use(express.urlencoded({extended: false}))

app.listen(process.env.PORT, ()=> console.log("Server Started"))