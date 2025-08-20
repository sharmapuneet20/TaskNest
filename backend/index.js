const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require('cors')
// const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
require('dotenv').config();
const { connectToDatabase } = require("./db");

const app = express();

// middleware
app.use(cors())
app.use(express.json());


// routes
// app.use("/todo",todoRouter);
app.use("/user",userRouter);



const startServer = async () => {
  try {
    await connectToDatabase();  // waits until DB connects
    const PORT = process.env.PORT || 3000; 
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1); // stop the app if DB connection fails
  }
};

startServer();