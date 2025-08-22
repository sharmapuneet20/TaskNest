const express = require('express');
const { UserModel , TodoModel} = require("../db/db");
const jwt = require('jsonwebtoken')
const auth = require("../middleware/user")
const SECRET_KEY = process.env.SECRET_KEY;

const bcrypt = require("bcrypt");
const router = express.Router();
const z = require("zod");

// zod schema
 const signupSchema = z.object({
  username: z.string().min(5).max(10),
  password: z.string().min(6, "Password must be at least 6 characters").max(10),

 })

// signup router
router.post('/signup' , async (req,res)=>{

  try{
    const parseData = signupSchema.safeParse(req.body);
    if(!parseData.success){
      return res.status(400).json({
        message: "Invalid input",
        errors: parseData.error.errors
      })
    }


  const {username , password } = parseData.data;

  const Hashedpassword  = await bcrypt.hash(password , 4);
      
   await UserModel.create({
        username : username,
        password: Hashedpassword,
      })

      res.json({
      message: "You have successfully signed up"
   })
    } catch(error){
      res.status(500).json({
        message: "Signup failed"
      })
    }
});




// signIn router
router.post('/signIn' , async(req,res)=>{
  try{
    const {username , password} = req.body;

      const user = await UserModel.findOne({
        username: username,
      })

    
    if(!user){
      res.status(403).json({
        message: "User not found"})
        }
        
const passwordmatch = await  bcrypt.compare(password , user.password);
  if(!passwordmatch){
    return res.status(401).json({message: "Incorrect Password "})
  }else{

        const token = jwt.sign({
            id: user._id
        }, SECRET_KEY );
    
         res.json({
            token: token,
            message: "you are signed in"
         })
}
  }
   catch(error){
    res.status(500).json({
            message: "signup falied"
         })
    }
})

module.exports = router;


