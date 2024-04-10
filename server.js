const express = require('express');
const app=express();
require('dotenv').config();
const dbConfig=require('./database/db');
app.use(express.json());
const userRoute = require ("./routes/userRoute.js");
const adminRoute = require ("./routes/adminRoute.js");
const doctorRoute = require ("./routes/doctorsRoute.js")
app.use('/api/admin',adminRoute);
app.use('/api/users',userRoute);
app.use('/api/doctor',doctorRoute);
const port= process.env.Port||5000;


app.listen(port,()=>console.log(`Hey there on port ${port}`));

