const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const bearerHeader = req.headers['authorization'];
    if ( typeof bearerHeader !== 'undefined' ){
        const bearer = bearerHeader.split(' ');
        jwt.verify(bearer[1],process.env.JWT_KEY, (err,authData) =>{
            if ( err ){
                res.sendStatus(403);
            } else {
                req.userId = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }

};