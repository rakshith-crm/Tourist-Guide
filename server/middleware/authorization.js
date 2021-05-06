const jwt = require('jsonwebtoken');
require('dotenv').config();

const middleware = (req, res, next)=>{
    try {
        const jwtToken = req.header('token');
        if(!jwtToken){
            return res.status(403).json('Not Authorized');
        }
        const payload = jwt.verify(jwtToken, process.env.secret_code );
        req.user = payload.user;
        console.log(req.user);
    } catch (error) {
         console.log(error.message);
         return res.status(500).send('Not Authorized!');
    }
    next();
};

module.exports = middleware;