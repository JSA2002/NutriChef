require('dotenv').config();
const DishSchema = require("./DishSchema");
const mongoose = require('mongoose');
const uri = process.env.API;

const DishesResult = mongoose.model('DishesResult', DishSchema);

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');
    return DishesResult; // Return the Mongoose model
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}
    //console.log(results)
    //mongoose.connection.close();
  module.exports = {connect};
