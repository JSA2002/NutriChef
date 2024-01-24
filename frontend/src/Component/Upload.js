import React from 'react';
//import {useState} from 'react';
import Navbar from "./Navbar.js";
import "./Upload.css"
const Upload = () => {
  //const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // uncomment below line
    //const file = event.target.files[0];
    //setSelectedFile(file);
    
  };

  /*const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('https://nutrichef-backend.vercel.app/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error uploading file:', error);
      });
  };*/

 function uploadfile() {
    //document.getElementById('fileInput').click();
    alert("Function under development...")
  };  


  return (
    <div className='upload-main'>
      <Navbar/>
    <div className='upload'>
      <label onClick={uploadfile}>Click and Upload here</label>
      <input id='fileInput' type="file" onChange={handleFileChange}/>
      {/* pass this commented line to below button -
      onClick={handleUpload}
       */}
      <button >Submit</button>
    </div>
    </div>
  );
};


export default Upload;