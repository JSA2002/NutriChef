const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema({
    Dish: {
      DishName: String,
      Ingredients: [String],
      Recipe: String,
      Protein: String,
      Vitamin: String,
      Fat: String,
      Carbohydrates: String,
      Iron: String,
      Fiber: String,
      Potassium: String,
      Cholesterol: String,
      Calcium: String,
      Minerals: [String],
      Healthy: String,
      Unhealthy: String,
      DailyProtein: String,
      DailyVitamin: String,
      DailyFat: String,
      DailyCarbohydrates: String,
      DailyIron: String,
      DailyFiber: String,
      DailyPotassium: String,
      DailyCholesterol: String,
      DailyCalcium: String,
      Calorie: String,
      Vegetarian: Boolean,
      AllergenPresent: [String],
      PrepTime: String,
      TypeCuisine: String,
      EatTime: String
    }
  }, { collection: 'DishesResult' });
  
module.exports = DishSchema;