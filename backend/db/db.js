const mongoose = require("mongoose");
const { required } = require("zod/mini");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

require('dotenv').config();


const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); 
    }
};

// Schema define
const User  = new Schema({
    username: {type: String , required: true},
    password: {type: String,  required: true },
    
})

const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
})

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel,
    connectToDatabase: connectToDatabase
}







