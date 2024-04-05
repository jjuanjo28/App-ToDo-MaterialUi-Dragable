import React, { useRef,useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
export default function WebcamComponent({photo, setPhoto, handleClose}) {
   
    const webcamRef = useRef()
    const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // if (imageSrc) {
    //   const binaryData = atob(imageSrc.split(",")[1]);
    //   const arrayBuffer = new ArrayBuffer(binaryData.length);
    //   const uint8Array = new Uint8Array(arrayBuffer);
    //   for (let i = 0; i < binaryData.length; i++) {
    //     uint8Array[i] = binaryData.charCodeAt(i);
    //   }
    //   const newBlob = new Blob([uint8Array], { type: "image/jpeg" });

    //   const file = new File([newBlob], `photo_${user.name}_${user.email}`);
   
    setPhoto(imageSrc)
    }
    


  return (
    <div>
      <Webcam
        ref={webcamRef}
        audio={false}
        height={350}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      >
      </Webcam>
      {photo?   <Button onClick={handleClose}>send your photo</Button> : <Button onClick={capture}>Capture photo</Button>}
        
       
      {photo? <img style={{width:"100px"}} src={photo}  alt="screenshot"/> :null}
       </div>
 
  );
}
