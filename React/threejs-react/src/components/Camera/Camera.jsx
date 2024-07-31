import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

const Camera = (props) => {
  const cameraRef = useRef();
  const set = useThree((state) => state.set);
  useEffect(() => {
    void set({ camera: cameraRef.current });
  }, []);
  useFrame(() => cameraRef.current.updateMatrixWorld());

  return <perspectiveCamera ref={cameraRef} {...props} far={50} />;
};

export default Camera;
