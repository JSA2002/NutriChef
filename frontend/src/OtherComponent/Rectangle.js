import React from 'react';

const Rectangle = ({bg1,text1,text2,h,w}) => {
  return (
    <div style={{height:h,width:w,margin:"10px"}}>
        <p style={{height:"50%", width:"100%",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:bg1,color:"black"}}>{text1}</p>
        <p style={{height:"50%", width:"97%",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid", borderColor:bg1}}>{text2}</p>
    </div>
  )
}

export default Rectangle;