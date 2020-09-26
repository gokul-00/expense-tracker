const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const colors = require('colors')
const morgan = require('morgan')
require('dotenv').config({ path: './config/config.env'})


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const db = require("./models");
db.sequelize.sync();

if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

app.use('/transactions',require('./routes/transactions'))

// if(process.env.NODE_ENV == 'production'){
//     app.use(express.static('./client/build'));

//     app.get('*',(req,res) => {
//          res.sendFile(path.resolve('C:\\Users\\gokul\\Desktop\\react-node', 'client', 'build', 'index.html'))
//     })
// }

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on PORT: ${PORT}`.yellow.bold))