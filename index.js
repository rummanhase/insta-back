require("dotenv").config();
require('./db/db.connect')
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const routers = require("./routers/postRoutes");


const app = express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/" , routers)

app.listen(process.env.PORT , ()=>{
    console.log(`App is listening at ${process.env.PORT}`);
})

module.exports = app;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// app.use("/", routers);
// console.log(process.env.DB_URL+process.env.DB_NAME );

// mongoose.connect(process.env.DB_URL+process.env.DB_NAME )
// .then(()=>{
//     console.log("Connected to DB");
// })
// .catch(()=>{
//     console.log("Cannot be connected to DB");
// });


// console.log(process.env.DB_URL + process.env.DB_NAME);

// app.listen(process.env.PORT, ()=>{
//     console.log("Server connected and running on the port ", process.env.PORT);
// });

// module.exports = app;

