import React, { useRef } from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NavigationCircle = ({ position, onClick }) => {
  const circleRef = useRef();

  useFrame(() => {
    circleRef.current.rotation.y = 3;
    circleRef.current.rotation.z = 3.15;
    circleRef.current.rotation.x = 1.57;
    circleRef.current.position.x = 1;
    circleRef.current.position.y = -.5;
  });

  const texture = new THREE.TextureLoader().load("images/arrow3.png");
  
  return (
    <mesh
      ref={circleRef}
      position={position}
      onClick={onClick}
      onPointerOver={(e) => (e.object.material.color.set("#ffffff"))}
      onPointerOut={(e) => (e.object.material.color.set("#00ff00"))}
    >
      <circleGeometry attach="geometry" args={[.3, 30]} rotation={[-Math.PI/2, 0, 0]}/>
      <meshBasicMaterial attach="material" color="#00ff00" map={texture} />
    </mesh>
  );
};

export const NavigationCircleRight = ({ position, onClick }) => {
  const circleRef = useRef();

  useFrame(() => {
    circleRef.current.rotation.y = 3;
    circleRef.current.rotation.z = 1.5;
    circleRef.current.rotation.x = 1.64;
    circleRef.current.position.x = 1.8;
    circleRef.current.position.y = -.5;
  });

  const texture = new THREE.TextureLoader().load("images/arrow3.png");
  
  return (
    <mesh
      ref={circleRef}
      position={position}
      onClick={onClick}
      onPointerOver={(e) => (e.object.material.color.set("#ffffff"))}
      onPointerOut={(e) => (e.object.material.color.set("#00ff00"))}
    >
      <circleGeometry attach="geometry" args={[.3, 30]} rotation={[-Math.PI/2, 0, 0]}/>
      <meshBasicMaterial attach="material" color="#00ff00" map={texture} />
    </mesh>
  );
};

export const NavigationCircleLeft = ({ position, onClick }) => {
  const circleRef = useRef();

  useFrame(() => {
    circleRef.current.rotation.y = 3;
    circleRef.current.rotation.z = 4.8;
    circleRef.current.rotation.x = 1.55;
    circleRef.current.position.x = 1.8;
    circleRef.current.position.y = -.5;
  });

  const texture = new THREE.TextureLoader().load("images/arrow3.png");
  
  return (
    <mesh
      ref={circleRef}
      position={position}
      onClick={onClick}
      onPointerOver={(e) => (e.object.material.color.set("#ffffff"))}
      onPointerOut={(e) => (e.object.material.color.set("#00ff00"))}
    >
      <circleGeometry attach="geometry" args={[.3, 30]} rotation={[-Math.PI/2, 0, 0]}/>
      <meshBasicMaterial attach="material" color="#00ff00" map={texture} />
    </mesh>
  );
};

