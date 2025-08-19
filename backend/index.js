const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require('cors')
// const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
// require('.env').config();
const SECRET_KEY = 'secret_key_mine';










const app = express();

// middleware
app.use(cors())
app.use(express.json());


// routes
// app.use("/todo",todoRouter);
app.use("/user",userRouter);






app.listen(3000);