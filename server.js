require('dotenv').config()
const express = require('express');
const app = express();

//import routes
const Routes = require('./routes/routes')
app.use('/', Routes)

//Lets our server to accept json
app.use(express.json())



app.listen(process.env.PORT, ()=> console.log("Server Started"))