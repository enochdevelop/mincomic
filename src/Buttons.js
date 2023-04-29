import React, { useRef, useState} from "react";
import "./style.css";
import { NavigationCircle } from './Navigation.js';
import { Room } from './App';
import { gsap } from "gsap";


export const Buttons = () => {

    const camRef = useRef();
    const [showNavigation, setShowNavigation] = useState(true);

    const [cameraPosition, setCameraPosition] = useState([7.6, 2.5, 0]);
    const [cameraRotation, setCameraRotation] = useState([-1.57, 1.3, 1.57]);

    const handleCircleClick = (position, rotation) => {
        if (camRef.current.cameraRef) {
          gsap.to(camRef.current.position, {
            x: position[0],
            y: position[1],
            z: position[2],
            duration: 0.4,
            ease: "power2.out",
            //onComplete: () => gsap.set(modelRefs.current[index].scale, { clearProps: 'all' }),
            //overwrite: "none",
          });
    
          gsap.to(camRef.current.cameraRef.rotation, {
            x: rotation[0],
            y: rotation[1],
            z: rotation[2],
            duration: 0.4,
            ease: "power2.out",
            //onComplete: () => gsap.set(modelRefs.current[index].scale, { clearProps: 'all' }),
            //overwrite: "none",
          });
    
          setCameraPosition(position);
          setCameraRotation(rotation);
    
  
        }
      };
  return (
    <>
    {showNavigation && (
      <NavigationCircle position={[-2, 0, 0]} onClick={() => handleCircleClick([3, 3, 0], [-1.57, 1.5, 1.57])} className="rounded-plane" /> 
    )}
    <Room ref={camRef} />
    
    </>
  ) 
}
