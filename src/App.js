import React, { Suspense, useRef, useState} from "react";
import { Canvas, useThree } from '@react-three/fiber';
import {OrbitControls, PerspectiveCamera } from '@react-three/drei';
import "./style.css";
import "./button.css";
import { RoomScene, Popup } from "./Room";
import { NavigationCircle, NavigationCircleRight, NavigationCircleLeft } from './Navigation.js';
import { gsap } from "gsap";
import {Helmet} from "react-helmet";
import Lottie from 'react-lottie';
import pencilAnimation from './142617-creative-loading-icon.json';
import "./loader.css";


function Room(){
  const cameraRef = useRef();
  const { camera } = useThree();

  const [showNavigation, setShowNavigation] = useState(true);

  const deg2rad = degrees => degrees * (Math.PI / 180);

  const [isDragging, setIsDragging] = useState(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });



  const handleCircleClick = (position, rotation) => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 1,
        ease: "power2.out",

      });

      gsap.to(cameraRef.current.rotation, {
        x: rotation[0],
        y: rotation[1],
        z: rotation[2],
        duration: 1,
        ease: "power2.out",

      });


      if (setShowNavigation){
        //setShowNavigation(false);
        const backButton = document.getElementById('back-button');
        if (backButton) {
          backButton.style.display = 'block';
          backButton.style.animation = "fadeIn 2s";
        }
      } 
    }
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    previousMousePositionRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) {
      return;
    }
    const { clientX, clientY } = event;
    const { x: previousX } = previousMousePositionRef.current;
    const deltaX = clientX - previousX;
    cameraRef.rotation.y -= deltaX * 0.01;
    previousMousePositionRef.current = {
      x: clientX,
      y: clientY,
    };
  };

  const resetCircleClick = () => {
    const def_position = [7.6, 2.5, 0];
    const def_rotation = [-1.57, 1.3, 1.57];
    handleCircleClick(def_position, def_rotation);

    //setShowNavigation(true)

    const backButton = document.getElementById('back-button');
    if (backButton) {
      backButton.style.display = 'none';
      backButton.style.animation = "fadeOut 2s";
    }
  }

  
  document.getElementById('back-button').onclick = resetCircleClick;
  
  camera.addEventListener('mousedown', handleMouseDown);
  camera.addEventListener('mouseup', handleMouseUp);
  camera.addEventListener('mousemove', handleMouseMove);

  return (
    <>
    <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} enabled={false}/>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={60} position={[7.6, 2.5, 0]} rotation={[-1.57, 1.3, 1.57]}/>
      <color args={[0, 0, 0]} attach='background' />
      <RoomScene />
      <hemisphereLight
        skyColor={0xffeeb1} 
        groundColor={0x080820} 
        intensity={.5}
      />
      {/*
  
        <directionalLight 
        color="light" 
        intensity={1} 
        position={[0, 1, 0]} 
        />
      */
      }
  
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
  
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
  
    {/* 
        <EffectComposer>
          <Bloom blendFunction={BlendFunction.ADD}
          intensity={.03} //the bloom intensity
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0,1]
          />
          <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
          />  
        </EffectComposer>
    */}
      {showNavigation && (
        <NavigationCircle position={[-2, 0, 0]} onClick={() => handleCircleClick([3, 3, 0], [-1.57, 1.5, 1.57])} className="rounded-plane" /> 
      )}
  
      {showNavigation && (
        <NavigationCircleLeft position={[-2, 0, 1.2]} onClick={() => handleCircleClick([3, 3, 0], [deg2rad(0), deg2rad(160), deg2rad(0)])} className="rounded-plane-left" /> 
      )}
  
      {showNavigation && (
        <NavigationCircleRight position={[-2, 0, -1.2]} onClick={() => handleCircleClick([1.77, 2, -1.1], [deg2rad(-20), deg2rad(20), deg2rad(5)])} className="rounded-plane-right" /> 
      )}
  
      </>
    );
}

const LoadingFallback = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pencilAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleAnimationComplete = () => {
    console.log("loading was called");
    setIsLoaded(true);
  };

  return (
    <div className={`loading-fallback${isLoaded ? ' fade-out' : ''}`}>
      <Lottie
        id="animation"
        options={defaultOptions}
        height={400}
        width={400}
        eventListeners={[
          {
            eventName: 'complete',
            callback: handleAnimationComplete,
          },
        ]}
      />
    </div>
  );
};

function App() {

  function fallCallback () {
    console.log("called callback");
  
    setTimeout(function() {
      const loadingFall = document.querySelector('.loading-fallback');
      if (loadingFall){
        loadingFall.style.animation = "fade-out 2s";
      }
    }, 3000);
  
    setTimeout(function() {
      const loadingFall = document.querySelector('.loading-fallback');
      const canvasChild = document.querySelector('#canvas-child');
      if (loadingFall){
        loadingFall.style.display = "none";
      }

      if (canvasChild){
        canvasChild.style.animation = "fade-in 2s";
      }
    }, 5000);
  }


  return (
    <Suspense fallback={fallCallback()}>
      <Helmet>
          <meta charSet="utf-8" />
          <title>mincomicsdesign</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="mincomicsdesign lobby" />
      </Helmet>
      <button id="back-button">Go Back</button>     
        <Popup />
        <div className="canvas-container">
          <LoadingFallback id="loader-container"/>
          <Canvas shadows id="canvas-child">
            <Room />
          </Canvas>
        </div>
      <div id="main-canvas" />
    </Suspense>
  );
}

export default App;