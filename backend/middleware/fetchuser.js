const jwt = require('jsonwebtoken');
let jwt_secret = "secret";

const fetchuser = (req,res,next) => 
    {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: 'No token, authorization denied'});
    }
    try {
        const data = jwt.verify(token,jwt_secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: 'Token is not valid'});
    }
}

module.exports = fetchuser;