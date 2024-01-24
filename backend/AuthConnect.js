require('dotenv').config();
const UserSchema = require("./UserSchema");
const mongoose = require('mongoose');
const uri = process.env.API;

const Users = mongoose.model('Users', UserSchema);

async function AuthConnect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');
    return Users; // Return the Mongoose model
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}
    //console.log(results)
    //mongoose.connection.close();
  module.exports = {AuthConnect};
