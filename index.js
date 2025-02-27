'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
require('./route')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)
