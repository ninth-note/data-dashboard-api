require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const dbConnection = require('./config/dbConnection')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

// connect to the mongoDB database
dbConnection()

// middleware allows access only to trusted origins
app.use(cors(corsOptions))

// allows the process of json (since this server will be sending and recieving json)
app.use(express.json())

// allows for parsing cookies
app.use(cookieParser())

// used to serve static files
app.use('/', express.static(path.join(__dirname, 'public')))

// the root path
app.use('/', require('./routes/root'))

// authentication and authorization
app.use('/auth', require('./routes/authRoutes'))

// controllers and routes
app.use('/users', require('./routes/userRoutes'))
app.use('/dashboards', require('./routes/dashboardRoutes'))
app.use('/plans', require('./routes/planRoutes'))

// catch non existant paths, e.g /soup and returns 404
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log('DB connection error: ' + err)
})