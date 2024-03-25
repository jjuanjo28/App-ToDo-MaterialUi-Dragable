import React, { useRef,useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
export default function WebcamComponent() {
    const [photo, setPhoto] = useState(null)
    const webcamRef = useRef()
    const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
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
        <Button onClick={capture}>Capture photo</Button>
      {photo? <img style={{width:"100px"}} src={photo}  alt="screenshot"/> :null}
       <a href={photo} download="captura.jpg">descargar captura</a>
    </div>
 
  );
}
