import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import "./App.css";
import { HexColorPicker } from "react-colorful";
import { proxy, useSnapshot } from "valtio";

function App() {
  const state = proxy({
    current: null,
    items: {
      laces: "#ffffff",
      mesh: "#ffffff",
      caps: "#ffffff",
      inner: "#ffffff",
      sole: "#ffffff",
      stripes: "#ffffff",
      band: "#ffffff",
      patch: "#ffffff",
    },
  });
  function Shoe(props) {
    const shoeRef = useRef();
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF("./shoe.gltf");

    useFrame((state) => {
      const t = state.clock.getElapsedTime();
      shoeRef.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
      shoeRef.current.rotation.x = Math.cos(t / 4) / 8;
      shoeRef.current.rotation.y = Math.sin(t / 4) / 8;
      shoeRef.current.rotation.y = (1 + Math.sin(t / 1.5)) / 10;
    }, []);
    const [hovered, setHovered] = useState(null);
    return (
      <group
        ref={shoeRef}
        {...props}
        onPointerOver={(e) => {
          setHovered(e.object.material.name);
        }}
        onPointerOut={(e) => {
          e.intersections.length === 0 && setHovered(null);
        }}
        onPointerMissed={(e) => {
          state.current = null;
        }}
        onClick={(e) => {
          e.stopPropagation();
          state.current = e.object.material.name;
        }}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.shoe.geometry}
          material={materials.laces}
          material-color={snap.items.laces}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.shoe_1.geometry}
          material={materials.mesh}
          material-color={snap.items.mesh}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.shoe_2.geometry}
          material={materials.caps}
          material-color={snap.items.caps}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.shoe_3.geometry}
          material={materials.inner}
          material-color={snap.items.inner}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.shoe_4.geometry}
          material={materials.sole}
          material-color={snap.items.sole}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.shoe_5.geometry}
          material={materials.stripes}
          material-color={snap.items.stripes}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.shoe_6.geometry}
          material={materials.band}
          material-color={snap.items.band}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.shoe_7.geometry}
          material={materials.patch}
          material-color={snap.items.patch}
        />
      </group>
    );
  }

  const Picker = () => {
    const snap = useSnapshot(state);
    return (
      <div style={{ display: snap.current ? "block" : "none" }}>
        <HexColorPicker
          className="picker"
          color={snap.items[snap.current]}
          onChange={(color) => (state.items[snap.current] = color)}
        />
        <h1>{snap.current}</h1>
      </div>
    );
  };
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight
          intensity={0.5}
          angle={2}
          penumbra={1}
          // position={[10, 15, 10]}
          castShadow
        />
        <Suspense fallback={null}>
          <Shoe />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.25}
            scale={10}
            blur={0.8}
          />
        </Suspense>
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
      <Picker />
    </>
  );
}

export default App;
