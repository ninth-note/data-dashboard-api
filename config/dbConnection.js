const mongoose = require('mongoose')

// use the db uri in .env to connect to database
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err)
    }
}

module.exports = dbConnection