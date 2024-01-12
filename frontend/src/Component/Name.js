import React, { useState, useEffect } from 'react'
import Navbar from "../Component/Navbar.js";
import "./Name.css";
import ChooseResult from './ChooseResult.js';
import { SpinnerDotted } from 'spinners-react';

const Name = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState('');
  const [spin,setSpin] = useState(false)

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://localhost:5000/name?searchTerm=${searchTerm}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setSpin(false)
        });
    } else {
      setData([]);
    }
  }, [searchTerm]);

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
    <div className='name-main'>
      <Navbar />
      <div className='name-content'>
        <h2>Get Nutrient Analysis and Culnary</h2>
        <p>Know whether it's healthy or unhealthy</p>
        <input type="text" placeholder='Enter the name of dish or product' value={searchTerm}
          onChange={(e) =>{ setSearchTerm(e.target.value);    setSpin(true)}}
          className='name-input' />
      </div>
      <div className='spinner-name'>
      <SpinnerDotted thickness="200" enabled={spin}/>
      </div>
      <div className='choose-name-main'>
        {
          Array.from(data).map((e) => {
            return <ChooseResult key={e._id} img={e.Dish.img1} name={e.Dish.DishName} />
          })
        }
      </div>
    </div>
  )
}

export default Name;