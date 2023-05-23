const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginScheme = new Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String,
},
{ timestamps: true });
const Login = mongoose.model('Login',loginScheme);

module.exports = Login;
