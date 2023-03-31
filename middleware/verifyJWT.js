const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {

    // get header
    const header = req.headers.authorization || req.headers.Authorization

    // handles if the header does not start with the string Bearer
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    // split away the Bearer and just get the token
    const token = header.split(' ')[1]

    //verify the token to our access token within the .env
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.user = decoded.Profile.username
            req.role = decoded.Profile.role
            next()
        }
    )
}

module.exports = verifyJWT 