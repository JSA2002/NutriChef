import React from 'react';
import Navbar from "../Component/Navbar.js";
//import CameraPhoto from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import "./Camera.css"
const Camera = () => {
 /* function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto', dataUri);
  }*/
  alert("Function under development...")
  return (
    <div className='camera-main'>
    <Navbar/>

    {/*<CameraPhoto
    onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
  />*/}
    </div>
  );
}

export default Camera;