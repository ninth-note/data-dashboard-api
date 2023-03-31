const authorizedOrigins = require('./authorizedOrigins')

/* 
    this function will take the role of a third party middleware,
    which will act as a lookup object for authorized origins
*/
const corsOptions = {

    origin: (origin, callback) => {

        // development phase
        // this allows only specified origins from authorizedOrigins or desktop application with no origin (fine during dev phase)
        if (authorizedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200

}

module.exports = corsOptions