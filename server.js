require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

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



app.listen(process.env.PORT, ()=> console.log("Server Started"))