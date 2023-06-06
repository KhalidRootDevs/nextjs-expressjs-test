const jwt = require('jsonwebtoken');

const getJwtToken = (userId) => {
    jwt.sign({userId: userId}, process.env.JWT_SECRET,{expiresIn: "1 day"})
}

module.exports = getJwtToken