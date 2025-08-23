const express = require("express");
const { auth } = require("../middleware/user");
const { TodoModel } = require("../db/db");
const router = express.Router();



// get to-dos
router.get('/' , auth , async(req, res)=>{
    try{
        const userId = req.userId;
        const todos = await TodoModel.find({userId: userId});

        res.status(200).json({
            message: "Todos fetched successfully",
            todos
        });
    }catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
})



// add to-dos
router.post('/' , auth, async(req , res)=>{

    try{ 
    const userId = req.userId;
         const {title , done } = req.body;

        if(!title){
            return res.status(400).json({message: "title is required"})
        }


       const todo =  await TodoModel.create({
            title,
            done,
            userId: userId
         })
         res.status(201).json({message: "Todo created successfully",
            todo
         })

         }
         catch(error){
            res.status(500).json({message: "Server error" , error: error.message})
         }
})

module.exports = router;















