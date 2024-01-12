import React, { useState,useEffect } from 'react'
import "./DishResult.css";
import ProgressBar from "@ramonak/react-progress-bar";
import GaugeChart from 'react-gauge-chart';
import Rectangle from '../OtherComponent/Rectangle.js';
import { useParams } from 'react-router-dom';
import { SpinnerDotted } from 'spinners-react';
import optionalImage from "../Imgs/optional.jpg";

const Dishresult = () => {
  const [data,setData] = useState("");
  let { dishname } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (dishname) {
        try {
          const response = await fetch(`http://localhost:5000/name/${dishname}`, {
            method: 'GET',
          });
  
          if (response.ok) {
            const d = await response.json();
            setData(d);
            console.log(dishname);
            console.log(d);
          } else {
            console.error(`Failed to fetch data: ${response.status}`);
            // Handle the error accordingly
          }
        } catch (error) {
          console.error(`An error occurred: ${error.message}`);
          // Handle the error accordingly
        }
      } else {
        setData([]);
      }
    };
  
    fetchData();
  }, [dishname]);
  
  if (!data) {
    return <div className='spinner'><SpinnerDotted thickness="200"/></div>;
  }

  return (
    <div key={data._id} className='dishresult-main'>
      <div className='dishresult'>
        <img src={data.Dish.img1 || optionalImage} alt="img" />
        <div className='dishresult-content'>
          <h2>{data.Dish.DishName}</h2>
          <p>Ingredients</p>
          {data.Dish.Ingredients.map((element) => {
            return <p key={element}>&#8226; {element}</p>
          })}
        </div>
      </div>

      <div className="about-main">
        <p className="pMain">About</p>
        <p>{data.Dish.About}</p>
      </div>

      <div className="nutrition">
        <p className='pMain'>Nutritional Value Per 100g</p>
        <div className='nutrition-inside'>
          <Rectangle bg1={"rgb(239, 202, 132)"} text1={"Protein"} text2={data.Dish.Protein} h={"65px"} w={"120px"} />
          <Rectangle bg1={"rgb(224, 129, 129)"} text1={"Vitamin"} text2={data.Dish.Vitamin} h={"65px"} w={"120px"} />
          <Rectangle bg1={"rgb(169, 225, 169)"} text1={"Fat"} text2={data.Dish.Fat} h={"65px"} w={"120px"} />
          <Rectangle bg1={"rgb(208, 208, 255)"} text1={"Carbs"} text2={data.Dish.Carbohydrates} h={"65px"} w={"120px"} />
          <Rectangle bg1={"rgb(250, 228, 250)"} text1={"Iron"} text2={data.Dish.Iron} h={"65px"} w={"120px"} />
          <Rectangle bg1={"rgb(255, 255, 219)"} text1={"Fiber"} text2={data.Dish.Fiber} h={"65px"} w={"120px"} />
          <Rectangle bg1={"rgb(201, 254, 254)"} text1={"Potassium"} text2={data.Dish.Potassium} h={"65px"} w={"120px"} />
          <Rectangle bg1={"rgb(243, 226, 255)"} text1={"Cholestrol"} text2={data.Dish.Cholesterol} h={"65px"} w={"120px"} />
          <Rectangle bg1={"rgb(255, 189, 224)"} text1={"Calcium"} text2={data.Dish.Calcium} h={"65px"} w={"120px"} />
          <Rectangle bg1={"rgb(201, 254, 254)"} text1={"Calories"} text2={data.Dish.Calorie} h={"65px"} w={"120px"} />
        </div>
      </div>

      <div className='onut'>
        <div className='onut2'>
          <p className='pMain'>Other Nutrients Present</p>
          <div className='otherNutrition'>
            {
              data.Dish.Minerals.map((m,i) => {
                return <p key={i} style={{ border: "2px solid white", margin: "10px", width: "160px", padding: "6px" }}>{m}</p>
              })
            }
          </div>
        </div>
      </div>

      <div className='meter'>
        <p className='pMain'>How Healthy It Is?</p>
        <GaugeChart
          id="gauge-chart1"
          nrOfLevels={6}
          percent={data.Dish.Healthy.replace(/%/, "") / 100}
          hideText={false}
          textColor="white"
          needleBaseColor="#F35725"
          arcPadding={0.015}
          cornerRadius={0}
          arcWidth={0.19}
          formatTextValue={(value) => `${value}%`}
          needleColor="#F35725"
          colors={[ "#F35825","#F57732","rgb(255, 196, 0)","rgb(255, 230, 0)", "rgb(163, 214, 75)","green"]}
          arcsLength={[0.075, 0.075, 0.075, 0.075, 0.075, 0.225]}
        />
      </div>

      <div className='dailyGoal'>
        <p className='pMain'>Daily Goals</p>
        <div className='nutrient-main'>
          <div className='nutrient'>
            <ProgressBar completed={data.Dish.DailyProtein.replace(/%/, "")} maxCompleted={100} bgColor="orange" baseBgColor="rgb(239, 202, 132)" isLabelVisible={false} />
            <p>{data.Dish.DailyProtein} Protein</p>
          </div>
          <div className='nutrient'>
            <ProgressBar completed={data.Dish.DailyVitamin.replace(/%/, "")} maxCompleted={100} bgColor="red" baseBgColor="rgb(224, 129, 129)" isLabelVisible={false} />
            <p>{data.Dish.DailyVitamin} Vitamin</p>
          </div>
          <div className='nutrient'>
            <ProgressBar completed={data.Dish.DailyFat.replace(/%/, "")} maxCompleted={100} bgColor="green" baseBgColor="rgb(169, 225, 169)" isLabelVisible={false} />
            <p>{data.Dish.DailyFat} Fat</p>
          </div>
          <div className='nutrient'>
            <ProgressBar completed={data.Dish.DailyCarbohydrates.replace(/%/, "")} maxCompleted={100} bgColor="blue" baseBgColor="rgb(208, 208, 255)" isLabelVisible={false} />
            <p>{data.Dish.DailyCarbohydrates} Carbs</p>
          </div>
          <div className='nutrient'>
            <ProgressBar completed={data.Dish.DailyIron.replace(/%/, "")} maxCompleted={100} bgColor="violet" baseBgColor="rgb(250, 228, 250)" isLabelVisible={false} />
            <p>{data.Dish.DailyIron} Iron</p>
          </div>
          <div className='nutrient'>
            <ProgressBar completed={data.Dish.DailyFiber.replace(/%/, "")} maxCompleted={100} bgColor="yellow" baseBgColor="rgb(255, 255, 219)" isLabelVisible={false} />
            <p>{data.Dish.DailyFiber} Fiber</p>
          </div>
          <div className='nutrient'>
            <ProgressBar completed={data.Dish.DailyPotassium.replace(/%/, "")} maxCompleted={100} bgColor="darkcyan" baseBgColor="rgb(201, 254, 254)" isLabelVisible={false} />
            <p>{data.Dish.DailyPotassium} Potassium</p>
          </div>
          <div className='nutrient'>
            <ProgressBar completed={data.Dish.DailyCholesterol.replace(/%/, "")} maxCompleted={100} bgColor="indigo" baseBgColor="rgb(243, 226, 255)" isLabelVisible={false} />
            <p>{data.Dish.DailyCholesterol} Cholestrol</p>
          </div>
          <div className='nutrient'>
            <ProgressBar completed={data.Dish.DailyCalcium.replace(/%/, "")} maxCompleted={100} bgColor="deeppink" baseBgColor="rgb(255, 189, 224)" isLabelVisible={false} />
            <p>{data.Dish.DailyCalcium} Calcium</p>
          </div>
        </div>
      </div>

      <div className='recipe'>
        <p className='pMain'>Recipe</p>
        <p>{data.Dish.Recipe}</p>
      </div>

      <div className='otherInfo'>
        <p className='pMain'>Other Info</p>
        <div className='otherInfo'>
          <p>Vegeterian : {data.Dish.Vegetarian?"Yes":"No"}</p>
          <p>Allergen Present: {data.Dish.AllergenPresent}</p>
          <p>Preparation Time : {data.Dish.PrepTime}</p>
          <p>Cuisine Type : {data.Dish.TypeCuisine}</p>
          <p>Eating Time : {data.Dish.EatTime}</p>
          <p>Unhealthy Rate : {data.Dish.Unhealthy}</p>
        </div>
      </div>

    </div>
  )
}

export default Dishresult;