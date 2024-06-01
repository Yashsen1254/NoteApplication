var jwt = require('jsonwebtoken');
const JWT_SEC = "secret";

const fetchuser = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    try {
        const data = jwt.verify(token,JWT_SEC);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}

module.export = fetchuser;