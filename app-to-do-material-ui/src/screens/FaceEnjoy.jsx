import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import * as faceapi from "@vladmandic/face-api";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

export default function FaceEnjoy() {
  const webcamRef = useRef();
  const canvasRef = useRef(null);


  (async () => {
    await faceapi.nets.ageGenderNet.loadFromUri("../../models");
    await faceapi.nets.faceExpressionNet.loadFromUri("../../models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("../../models");
    await faceapi.nets.faceLandmark68TinyNet.loadFromUri("../../models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("../../models");
    await faceapi.nets.ssdMobilenetv1.loadFromUri("../../models");
    await faceapi.nets.tinyFaceDetector.loadFromUri("../../models");

    const image = document.getElementById("imageFace");
    const canvas = document.getElementById("canvas");
    console.log("soy el canvas:", canvas);

    let fullFaceDescriptions = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withAgeAndGender()
      .withFaceExpressions();

    console.log("soy fullFaceDescriptios:", fullFaceDescriptions);
    faceapi.draw.drawDetections(canvas, fullFaceDescriptions)
    faceapi.draw.drawFaceLandmarks(canvas,fullFaceDescriptions)
    faceapi.draw.drawFaceExpressions(canvas,fullFaceDescriptions)
  })();

  return (
    <div style={{display: "inline-block", width:400, height:400, margin: "0 auto", position:"relative"}}>
      {/* <Webcam
        ref={webcamRef}
        canvasRef={canvasRef}
        canvas={true}
        autoPlay
        playsInline
        muted
        audio={false}
        videoConstraints={videoConstraints}
        id="myWebcam"
        style={{position:"absolute",zIndex:0}}
        
      /> */}
      <img
        style={{position:"absolute",  width: 400, height: 400 }}
        id="imageFace"
        src="../../photo/photo_pedrito_pedrion.jpg"
      />
      <canvas
        id="canvas"
        width={400}
        height={400}
        ref={canvasRef}
        style={{position:"relative", zIndex:20}}
      ></canvas>
    </div>
  );
}
