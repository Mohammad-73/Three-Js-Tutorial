import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useSnapshot } from "valtio";

function Shoe(props) {
  const shoeRef = useRef();
  const snap = useSnapshot(props.state);
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
        props.state.current = null;
      }}
      onClick={(e) => {
        e.stopPropagation();
        props.state.current = e.object.material.name;
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

export default Shoe;
