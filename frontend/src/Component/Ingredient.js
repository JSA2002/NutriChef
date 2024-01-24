import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import "./Incredient.css";
import Navbar from "./Navbar";
import cross from "../Imgs/cross.png";
import ChooseResult from "./ChooseResult";
import { SpinnerDotted } from 'spinners-react';

const Ingredient = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [spin, setSpin] = useState(false)

  const ingredientOptions = [
    'All-Purpose Flour (Maida)',
    'Almonds',
    'Asafoetida (Hing)',
    'Avocado',
    'Bajra Flour',
    'Baking Soda',
    'Baking Powder',
    'Basmati Rice',
    'Basil Leaves',
    'Bay Leaves',
    'Beef',
    'Besan (Gram Flour)',
    'Bell Peppers',
    'Biryani Masala',
    'Biscuits',
    'Bread',
    'Black Gram Lentils',
    'Black Salt',
    'Butter',
    'Cabbage',
    'Cane Sugar',
    'Cardamom',
    'Cardamom Powder',
    'Carrot',
    'Capsicum',
    'Cashew Nuts',
    'Cashews',
    'Cauliflower (Gobi)',
    'Chana Dal (Bengal Gram)',
    'Chaat Masala',
    'Cheese',
    'Cherry',
    'Chili Paste',
    'Chili Sauce',
    'Chicken',
    'Chickpeas',
    'Cilantro (Coriander Leaves)',
    'Cinnamon Stick',
    'Croutons',
    'Coconut',
    'Cocoa Powder',
    'Cooked Basmati Rice',
    'Coriander Powder',
    'Corn Flour',
    'Cornstarch',
    'Corn Syrup',
    'Cumin Powder',
    'Cumin Seeds (Jeera)',
    'Curry Leaves',
    'Curds (Yogurt)',
    'Cucumbers',
    'Dates',
    'Dry Red Chilies',
    'Espresso',
    'Eggs',
    'Eggplants (Baigan)',
    'Fenugreek Leaves (Methi)',
    'Fenugreek Seeds (Methi)',
    'Fennel Seeds',
    'Fish Fillets',
    'Flatbread',
    'Fresh Cream',
    'French Bread',
    'Garam Masala',
    'Garlic',
    'Gelatin',
    'Ghee',
    'Ginger',
    'Ginger-Garlic Paste',
    'Gram Flour (Besan)',
    'Green Chilies',
    'Green Chutney',
    'Green Garlic',
    'Ground Coriander',
    'Ground Cumin',
    'Groundnut (Peanut) Oil',
    'Honey',
    'Ketchup',
    'Ice Cream',
    'Ice Cubes',
    'Jaggery',
    'Jalapenos',
    'Kidney Beans (Rajma)',
    'Lemon Juice',
    'Lettuce',
    'Mint Leaves',
    'Mayonnaise',
    'Mung Dal (Split Green Gram)',
    'Mutton',
    'Mushrooms',
    'Mustard Seeds',
    'Nigella Seeds (Kalonji)',
    'Noodles',
    'Nuts',
    'Onions',
    'Olive Oil',
    'Okra',
    'Oregano',
    'Paneer (Cottage Cheese)',
    'Paprika',
    'Parsley',
    'Pav (Indian Bread Rolls)',
    'Pizza Dough',
    'Pistachios',
    'Peanuts',
    'Prawns',
    'Potatoes',
    'Powdered Sugar',
    'Puris (Fried Crispy Bread)',
    'Raisins',
    'Rava (Semolina)',
    'Rasam Powder',
    'Red Chili Powder',
    'Rice',
    'Rice Flour',
    'Rosemary',
    'Rose Water',
    'Sabudana (Sago)',
    'Salmon',
    'Saffron',
    'Sambhar Powder',
    'Salt',
    'Salsa',
    'Sesame Seeds',
    'Sesame Oil',
    'Shrimp',
    'Spring Roll Wrappers',
    'Spinach',
    'Soy Sauce',
    'Schezwan Sauce',
    'Sugar',
    'Tamarind Paste',
    'Tamarind Pulp',
    'Tandoori Masala',
    'Thyme',
    'Toor Dal (Pigeon Pea Lentils)',
    'Tomato Ketchup',
    'Tomatoes',
    'Tortilla',
    'Toor Dal (Yellow Lentils)',
    'Turmeric Powder',
    'Urad Dal (Black Gram Lentils)',
    'Vanilla Extract',
    'Vegetable Oil',
    'Vegetables',
    'Vinegar',
    'Water',
    'Whole Wheat Flour'
  ]
  


  const onChange = (event, { newValue }) => {
    setValue(newValue);
    setSpin(true)
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(
      ingredientOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    if (!selectedIngredients.includes(suggestion)) {
      setSelectedIngredients([...selectedIngredients, suggestion]);
    }
    setValue("");
  };

  const removeIngredient = (ingredient) => {
    const updatedIngredients = selectedIngredients.filter(
      (item) => item !== ingredient
    );
    setSelectedIngredients(updatedIngredients);
  };

  const inputProps = {
    placeholder: "Select Ingredients here",
    value,
    onChange: onChange,
  };

  useEffect(() => {
    const CallResult = async () => {   
      await fetch("https://nutrichef-backend.vercel.app/ingredient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ selectedIngredients })
      })
        .then(async (response) => await response.json())
        .then((data) => {
          setFinalData(data)
          console.log(data);
        })
        .finally(() => {
          setSpin(false); // Hide spinner when fetch is completed (success or failure)
        });
    }
    CallResult();
  }, [selectedIngredients]);

  document.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.top = (e.clientY - 2.5) + 'px';
    sparkle.style.left = (e.clientX - 2.5) + 'px';
    document.body.appendChild(sparkle);
    
    sparkle.addEventListener('animationend', () => {
        sparkle.remove();
    });
});

  return (
    <div>
      <Navbar />
      <div className="incre-main">
        <h3>ENTER INGREDIENTS, GET THE DISHES</h3>
        <p>Find dishes based on ingredients that you have on hand</p>
        <div className="incre-selected">
          <p>Selected Ingredients</p>
          <ul className="sel-main">
            {selectedIngredients.map((ingredient) => (
              <li key={ingredient} className="sel">
                {ingredient}
                <img src={cross} alt="cr" className="cross" onClick={() => removeIngredient(ingredient)}></img>
              </li>
            ))}
          </ul>
        </div>
        <div className="auto">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onSuggestionSelected={onSuggestionSelected}
              getSuggestionValue={(suggestion) => suggestion}
              renderSuggestion={(suggestion) => <div>{suggestion}</div>}
              inputProps={inputProps}
            />
        </div>
        <div>
          <div className='spinner-name'>
            <SpinnerDotted thickness="200" enabled={spin} />
          </div>
          <div className='choose-name-main'>
            {
              Array.from(finalData).map((e) => {
                return <ChooseResult key={e._id} img={e.Dish.img1} name={e.Dish.DishName} />
              })
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default Ingredient;
