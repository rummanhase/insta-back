require('dotenv').config()
const mongoose = require('../export-lib/libraries').mongoose
module.exports = mongoose.connect(process.env.DB_URL+process.env.DB_NAME)

.then(()=>console.log("db connected"))
.catch((err)=>console.log("db NoT conneted"+err))
