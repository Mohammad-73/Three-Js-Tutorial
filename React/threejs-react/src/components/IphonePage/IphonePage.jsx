import React, { useState } from "react";
import Iphone13ProMaxModel from "../Iphone13ProMaxModel/Iphone13ProMaxModel";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import DatGui, { DatNumber } from "react-dat-gui";
import Camera from "../Camera/Camera";

const IphonePage = () => {
  const [positionForCamera, setPositionForCamera] = useState({
    x: 0,
    y: 0,
    z: 7,
  });

  return (
    <>
      <h2>Iphone 13 Pro Max</h2>
      <DatGui
        data={positionForCamera}
        onUpdate={(data) => {
          console.log(data);
          setPositionForCamera({
            ...positionForCamera,
            ...data,
          });
        }}
      >
        <DatNumber path={"x"} label={"x value for camera"} />
        <DatNumber path={"y"} label={"y value for camera"} />
        <DatNumber path={"z"} label={"z value for camera"} />
      </DatGui>
      <div className="canvas">
        <Canvas shadows>
          <Camera
            position={[
              positionForCamera.x,
              positionForCamera.y,
              positionForCamera.z,
            ]}
            fov={50}
          />
          <ambientLight intensity={1} />
          <spotLight intensity={1} position={[2, 0, 4]} />
          <Suspense fallback={null}>
            <Iphone13ProMaxModel scale={[4, 4, 4]} />
            <ContactShadows position={[0, -2, 0]} scale={10} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls
          //   minPolarAngle={Math.PI / 2}
          //   maxPolarAngle={Math.PI / 2}
          //   enableZoom={false}
          //   enablePan={false}
          />
        </Canvas>
      </div>
    </>
  );
};

export default IphonePage;
