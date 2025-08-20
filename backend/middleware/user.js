const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET ;
// auth middleware


function auth( req, res , next){
   const token = req.headers.token;

   const decodedData = jwt.verify(token, SECRET);

   if(decodedData){
    req.userId = decodedData.userId;
    next();
   }else{
    res.status(403).json({
        message: "Incorrect Credentials"
    })
   }
    
}


module.exports = {
    auth,
    SECRET,
};