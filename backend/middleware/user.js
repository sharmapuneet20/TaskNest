const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY ;
// auth middleware


function auth( req, res , next){
    try{
   const token = req.headers.token;

   const decodedData = jwt.verify(token, SECRET_KEY);

   if(decodedData){
    req.userId = decodedData.userId;
    next();
   }else{
    res.status(403).json({
        message: "Incorrect Credentials"
    })
   }
    
} catch(error){
    console.error("Auth middleware error:", error);
    res.status(403).json({
      message: "Invalid or expired token"
    });
}}


module.exports = {
    auth,
    SECRET_KEY,
}