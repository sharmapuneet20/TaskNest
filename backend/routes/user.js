const express = require('express');
const jwt = require('jsonwebtoken')
const {auth, SECRET_KEY} = require("../middleware/user")

const router = express.Router();

let users =[];



// signup router
router.post('/signup', (req,res)=>{
      const username = req.body.username;
      const password = req.body.password;

      users.push({
            username : username,
            password: password
      })

   res.json({
      message: "you are signed up"
   })
   
})




// signIn router
router.post('/signIn',(req,res)=>{
      const username = req.body.username;
      const password = req.body.password;

    let foundUser = null;
    for(let i =0; i<users.length; i++){
      if(users[i].username === username && users[i].password === password){
            foundUser = users[i]
      }
    }
    if(!foundUser){
      res.status(401).json({
        message: "Incorrect Credentials"
      })
           
   
      return
    }else{
        const token = jwt.sign({
            username
        }, SECRET_KEY );
    
         res.json({
            token: token
         })

    }




})

module.exports = router;


