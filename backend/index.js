const express = require("express")
const cors = require('cors')
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");







const app = express();

// middleware
app.use(cors())
app.use(express.json());

app.use("/todo",todoRouter);
app.use("/user",userRouter);






app.listen(3000);