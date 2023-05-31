const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const url = "mongodb://127.0.0.1:27017/user"

const app = express()
const bodyParser=require('body-parser')

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', () => {
    console.log('database connection....')
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())

const AuthRoute = require('./routes/user')
app.use('/', AuthRoute)

const DataRoute = require('./routes/data')
app.use('/', DataRoute)

app.listen(4000, () => console.log('server connection...4000'))