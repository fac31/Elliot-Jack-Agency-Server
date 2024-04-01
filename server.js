require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))
app.use(express.json())

const propertyData = require('./routes/propertyData')
app.use('/property-data', propertyData)

app.listen(4003, () => console.log('server has started'))

