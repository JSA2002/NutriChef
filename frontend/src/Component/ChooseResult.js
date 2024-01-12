import React from 'react';
import "./ChooseResult.css";
import { Link } from "react-router-dom";
import optionalImage from "../Imgs/optional.jpg";

const ChooseResult = (props) => {
  return (
    <Link to={props.name} style={{ textDecoration: 'none' }}>    
    <span className='choose-main'>
      <div>
        <img src={props.img || optionalImage} alt="img" />
      </div>
      <div className='choose-name'>
        <h4>{props.name}</h4>
      </div>
    </span>
    </Link>

  )
}

export default ChooseResult;