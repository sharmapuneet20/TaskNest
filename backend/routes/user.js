const express = require('express');
const { UserModel , TodoModel} = require("../db/db");
const jwt = require('jsonwebtoken')
const {auth, SECRET_KEY} = require("../middleware/user")

const router = express.Router();



// signup router
router.post('/signup' , async (req,res)=>{

  try{
      const email = req.body.email;
      const password = req.body.password;
      const name = req.body.name;

      await UserModel.create({
        email : email,
        password: password,
        name: name
      })

      res.json({
      message: "you are signed up"
   })
    } catch(e){
      res.status(403).json({
        message: "failed"
      })
    }
})




// signIn router
router.post('/signIn' , async(req,res)=>{
      const email = req.body.email;
      const password = req.body.password;

      const user = await UserModel.findOne({
        email:email,
        password: password

      })

    
    if(!foundUser){
      res.status(403).json({
        message: "Incorrect Credentials"
      })
           
   
      return
    }else{
        const token = jwt.sign({
            id: user._id
        }, SECRET_KEY );
    
         res.json({
            token: token
         })
    }
})

module.exports = router;


