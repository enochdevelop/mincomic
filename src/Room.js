import React, { useEffect, useRef, useState} from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';
import { gsap } from "gsap";
import "./style.css";
import "./button.css";
import "./media.css";
import "./popupstyle.css";
import "./contact.css";
import emailjs from "@emailjs/browser";



let popup_open = false;

export function RoomScene() {

  const gltfLoader = new GLTFLoader();
  const models = [
    "models/room04_26.glb",
    "models/chair04_20.glb",
    "models/shelf04_26.glb",
    "models/computer04_20.glb",
    "models/laptop04_20.glb",
    "models/computerscreen_4_26.glb",
    "models/laptopscreen_4_26.glb",
    "models/projectposter2.1.glb",
    "models/desk04_26.glb",
    "models/project1_4_26.glb",
    "models/project2_4_26.glb",
    "models/project3_4_26.glb",
    "models/project4_4_26.glb",
    "models/project5_4_26.glb",
    "models/project6_4_26.glb",
    "models/project7_4_26.glb",
    "models/project8_4_26.glb",
    "models/project9_4_26.glb",
    "models/projectextra_4_26.glb",
    "models/git04_26.glb",
    "models/snap04_26.glb",
    "models/linked04_26.glb"
  ];
  
  const [gltf, setGltf] = useState([]);
  
  useEffect(() => {
    Promise.all(models.map(model => gltfLoader.loadAsync(process.env.PUBLIC_URL + model)))
      .then(setGltf);
  }, []);
  
  
  const modelRefs = useRef([]);

  useEffect(() => {
    modelRefs.current = gltf.map((g) => {
      g.scene.scale.set(0.5, 0.5, 0.5);
      g.scene.position.set(0, -1, 0);
      g.scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          object.material.envMapIntensity = 20;
          //object.material.transparent = true; // enable transparency
          //object.material.opacity = 0.5; // set the opacity level
        }
      });
      return g.scene;
    });
  }, [gltf]);

    useEffect(() => {
      modelRefs.current = gltf.map((g) => {
        g.scene.scale.set(0.5, 0.5, 0.5);
        g.scene.position.set(0, -1, 0);
        g.scene.traverse((object) => {
          if (object instanceof Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
            object.material.envMapIntensity = 20;
            //object.material.transparent = true; // enable transparency
            //object.material.opacity = 0.5; // set the opacity level
          }
        });
        return g.scene;
      });
    }, [gltf]);
       
    const handleMouseEnter = (index, x_pos, y_pos, z_pos) => {
      if (modelRefs.current) {
        gsap.to(modelRefs.current[index].scale, {
          x: x_pos,
          y: y_pos,
          z: z_pos,
          duration: 0.2,
          ease: "power2.out",
          //onComplete: () => gsap.set(modelRefs.current[index].scale, { clearProps: 'all' }),
          //overwrite: "none",
        });
      }
    };

    //.52
    //.5
    
    const getSize = (index) => {
      console.log(modelRefs.current[index].scale);
    };

    const handleMouseLeave = (index, x_pos, y_pos, z_pos) => {
      if (modelRefs.current) {
        gsap.to(modelRefs.current[index].scale, {
          x: x_pos,
          y: y_pos,
          z: z_pos,
          duration: 0.2,
          ease: "power2.out",
          //onComplete: () => gsap.set(modelRefs.current[index].scale, { clearProps: 'all' }),
          //overwrite: "none",
        });
      }
    };

    const handleClick = (page, screen, pop) => {
      if (!popup_open){
        popup_open = true;
        document.getElementById(page).style.display = 'block';
        document.getElementById(screen).style.display = 'block';
        document.getElementById(screen).style.animation = "fadeIn 1s";
        document.getElementById(pop).style.animation = "fadeIn 1s";
      }
    };

    if (gltf.length === 0) {
      return null; // or some other loading indicator
    }

    return (
    <>   
        {/* <Popup ref={popupRef} />*/}
        <primitive object={gltf[0].scene} />
        <primitive object={gltf[1].scene} />
        <primitive object={gltf[2].scene} />
        <primitive object={gltf[3].scene} />
        <primitive object={gltf[4].scene} />
        <primitive object={gltf[5].scene} onClick={() => handleClick( 'main-page', 'email-screen', 'email')}/>
        <primitive object={gltf[6].scene} />
        <primitive object={gltf[7].scene} />
        <primitive object={gltf[8].scene} />
        <primitive object={gltf[9].scene} onClick={() => handleClick( 'main-page', 'vr-screen', 'vr')}  onPointerEnter={() => handleMouseEnter(9, .5, .5, .48)} onPointerLeave={() => handleMouseLeave(9, .5, .5, .5)}/>    
        <primitive object={gltf[10].scene} onClick={() => handleClick( 'main-page', 'free-screen', 'free')} onPointerEnter={() => handleMouseEnter(10, .5, .5, .48)} onPointerLeave={() => handleMouseLeave(10, .5, .5, .5)}/>   
        
        <primitive object={gltf[11].scene} onClick={() => {window.open("https://devpost.com/software/pillow-punch?ref_content=contribution-prompt&ref_feature=engagement&ref_medium=email&utm_campaign=contribution-prompt&utm_content=contribution_reminder&utm_medium=email&utm_source=transactional#app-team", "_blank");}} 
         onPointerEnter={() => handleMouseEnter(11, .5, .5, .48)} onPointerLeave={() => handleMouseLeave(11, .5, .5, .5)}/> 

        <primitive object={gltf[12].scene} onClick={() => handleClick( 'main-page', 'holo-screen', 'holo')} onPointerEnter={() => handleMouseEnter(12, .5, .5, .48)} onPointerLeave={() => handleMouseLeave(12, .5, .5, .5)}/> 
        <primitive object={gltf[13].scene} onClick={() => handleClick( 'main-page', 'portal-screen', 'portal')} onPointerEnter={() => handleMouseEnter(13, .5, .5, .48)} onPointerLeave={() => handleMouseLeave(13, .5, .5, .5)}/> 
        
        <primitive object={gltf[14].scene} onClick={() => {window.open("https://enochdevelops.com/", "_blank");}} 
         onPointerEnter={() => handleMouseEnter(14, .5, .5, .48)} onPointerLeave={() => handleMouseLeave(14, .5, .5, .5)}/>  

        <primitive object={gltf[15].scene} onClick={() => handleClick( 'main-page', 'hog-screen', 'hog')} onPointerEnter={() => handleMouseEnter(15, .5, .5, .48)} onPointerLeave={() => handleMouseLeave(15, .5, .5, .5)}/> 
        <primitive object={gltf[16].scene} onClick={() => handleClick( 'main-page', 'grab-screen', 'grab')} onPointerEnter={() => handleMouseEnter(16, .5, .5, .48)} onPointerLeave={() => handleMouseLeave(16, .5, .5, .5)}/> 
        <primitive object={gltf[17].scene} onClick={() => handleClick( 'main-page', 'ball-screen', 'ball')} onPointerEnter={() => handleMouseEnter(17, .5, .5, .48)} onPointerLeave={() => handleMouseLeave(17, .5, .5, .5)}/> 
        <primitive object={gltf[18].scene} /> 
        <primitive object={gltf[19].scene} onClick={() => {window.open("https://github.com/enochdevelop", "_blank");}} 
        onPointerEnter={() => handleMouseEnter(19, .507, .507, .507)} onPointerLeave={() => handleMouseLeave(19, .5, .5, .5)}/> 

        <primitive object={gltf[20].scene} onClick={() => {window.open("https://lensstudio.snapchat.com/creator/d6TqmX7QKsLE-FU_u9UXwQ", "_blank");}} 
         onPointerEnter={() => handleMouseEnter(20, .507, .507, .507)} onPointerLeave={() => handleMouseLeave(20, .5, .5, .5)}/> 

        <primitive object={gltf[21].scene} onClick={() => {window.open("https://www.linkedin.com/in/enoch-ajagbe/", "_blank");}} 
         onPointerEnter={() => handleMouseEnter(21, .507, .507, .507)} onPointerLeave={() => handleMouseLeave(21, .5, .5, .5)}/> 
    </> 
    );
   
}


export const Popup = () => {

  const form = useRef();

 
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_6tt254c', 'template_eoxdpqw', form.current, 'XxEXP5_yY8DgG-RV5')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

      form.current.reset();
  };

  function bounceButton() {
    var button = document.querySelector('.submit_text');
    button.classList.add('scale-in');
    setTimeout(function() {
      button.classList.remove('scale-in');
    }, 200);
  }

  function closePopup(page, screen, pop, v_id) {
    document.getElementById(screen).style.animation = "fadeOut 1s";
    document.getElementById(pop).style.animation = "fadeOut 1s";


    setTimeout(function () {
      document.getElementById(screen).style.display = "none";
      document.getElementById(page).style.display = 'none';

      if (v_id !== null){
        stopVideo(v_id);
      }

      popup_open = false;
      console.log("its closed");
    }, 300); // delay for the length of the animation
  }

  const stopVideo = (iframeId) => {
    const iframeToStop = document.getElementById(iframeId);
    if (iframeToStop) {
      iframeToStop.src = iframeToStop.src;
    } 
      document.querySelectorAll('video').forEach(v => { v.pause() });
  };

  //document.getElementById('chair').onclick = onModelClick;
  
  return (
    <div id="main-page">

      <div id="vr-screen" className="popup-screen" style={{ display: popup_open ? 'block' : 'none' }} >
        <div id="vr" className="popup">
          <div className="title-section">
            <h2>VR-MMORPG</h2>
          </div>
          <div className="video-section">
          <video id="vr_vid" src="./images/arrow_shot.mp4" autoPlay controls width="100%" height="600" ></video>
          </div>
        <div className="description-section">
          <h3>Projectile Test</h3>
          <p>Using positioning data to detect when the arrow collides with something. </p> 
          <p>Checking prefab creation and destruction.
          </p>
        </div>

        <div className="spacer"></div>
        <div className="video-section">
        <video id="vr_vid" src="./images/arrow_barrage.mp4" autoPlay controls width="100%" height="600" ></video>
          </div>
        <div className="description-section">
        <h3>Skills</h3>
        <p>Figuring out new ways of interactive skill set activation. <br />  <br /> 
        Using the arrows trajectory, distance accumulated and collision, an arrow barrage skill where arrows are raining 
          from the sky is activated when conditions are met. </p>
        </div>

        <div className="spacer"></div>
        <div className="video-section">
        <video id="vr_vid" src="./images/weapons.mp4" autoPlay controls width="100%" height="600" ></video>
          </div>
        <div className="description-section">
        <h3>Weapons</h3>
        <p>Basic functionality for objects grabbing, rotation, and releasing.</p>
        </div>
        <div className="spacer-skills"></div>
        <div className="skills-section">
          <div className="skill">VR</div>
          <div className="skill">C#</div>
          <div className="skill">Blender</div>
          <div className="skill">Oculus VR</div>
          <div className="skill">Unity</div>
        </div>
            {/*<img src="path/to/image.jpg" alt="Pop-up Image" />  */}
            <button id="close-btn" onClick={() => closePopup( 'main-page', 'vr-screen', 'vr', 'vr_vid')}> &#10006;</button>
          </div>
      </div>  

      
      <div id="free-screen" className="popup-screen" style={{ display: popup_open ? 'block' : 'none' }} >
        <div id="free" className="popup">
          <div className="title-section">
            <h2>Freedome</h2>
          </div>
          <div className="video-section">
            <iframe id ="free_vid"  src="https://www.youtube.com/embed/F6kCQ9LlE9A"
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
              width="100%" height="600">
            </iframe>
          </div>
          <div></div>
          <a id="try-button" href="https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=42a5bc049ca746fe89ed1271de3f5afe&metadata=01" 
          target="_blank"  rel="noopener noreferrer"> Try it Out
          </a>

          <div className="spacer-skills"></div>
        <div className="skills-section">
          <div className="skill">Social AR</div>
          <div className="skill">JavaScript</div>
          <div className="skill">LensStudio</div>
          <div className="skill">HandTracking</div>
        </div>
            {/*<img src="path/to/image.jpg" alt="Pop-up Image" />  */}
            <button id="close-btn" onClick={() => closePopup( 'main-page', 'free-screen', 'free', 'free_vid')}> &#10006;</button>
          </div>
      </div>


      
      <div id="holo-screen"  className="popup-screen" style={{ display: popup_open ? 'block' : 'none' }} >
        <div id="holo" className="popup">
          <div className="title-section">
            <h2>Holographic UI</h2>
          </div>
          <div className="video-section">
            <iframe id ="holo_vid" src='https://www.youtube.com/embed/kCffXlKoro0?mute=1'
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
              width="100%" height="600">
            </iframe>
          </div>
        <div></div>
  
        <div className="skills-section">
          <div className="skill">HandTracking</div>
          <div className="skill">MarkerTracking</div>
          <div className="skill">Collision</div>
          <div className="skill">JavaScript</div>
        </div>
            {/*<img src="path/to/image.jpg" alt="Pop-up Image" />  */}
            <button id="close-btn" onClick={() => closePopup( 'main-page', 'holo-screen', 'holo', 'holo_vid')}> &#10006;</button>
          </div>
      </div>

      
      <div id="portal-screen" className="popup-screen" style={{ display: popup_open ? 'block' : 'none' }} >
        <div id="portal" className="popup">
          <div className="title-section">
            <h2>Portal Device</h2>
          </div>
          <div className="video-section">
            <iframe id ="portal_vid" src='https://www.youtube.com/embed/JUeaYkG0IQo?mute=1'
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
              width="100%" height="600">
            </iframe>
          </div>
          <div></div>
          <a id="try-button" href="https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=b55b959fca4e4a79ab7473b26ad0617d&metadata=01" 
          target="_blank"  rel="noopener noreferrer"> Try it Out
          </a>
          <div className="spacer-skills"></div>
        <div className="skills-section">
          <div className="skill">Lens Studio</div>
          <div className="skill">Blender</div>
          <div className="skill">JavaScript</div>
          <div className="skill">Connected Lens</div>
          <div className="skill">AR Physics</div>
          <div className="skill">WorldTracking</div>
          <div className="skill">Raycast</div>
        </div>
            {/*<img src="path/to/image.jpg" alt="Pop-up Image" />  */}
            <button id="close-btn" onClick={() => closePopup( 'main-page', 'portal-screen', 'portal', 'portal_vid')}> &#10006;</button>
          </div>
      </div>


      
      <div id="hog-screen" className="popup-screen" style={{ display: popup_open ? 'block' : 'none' }} >
        <div id="hog" className="popup">
          <div className="title-section">
            <h2>Hogwarts House</h2>
          </div>
          <div className="video-section">
            <iframe id ="hog_vid" src='https://www.youtube.com/embed/rrxN1dzKwc8?mute=1'
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
              width="100%" height="600">
            </iframe>
          </div>
          <div></div>
          <a id="try-button" href="https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=d093213858424c89b9d5fa7c55afc36a&metadata=01" 
          target="_blank"  rel="noopener noreferrer"> Try it Out
          </a>
          <div className="spacer-skills"></div>
        <div className="skills-section">
          <div className="skill">Social AR</div>
          <div className="skill">JavaScript</div>
          <div className="skill">HeadTracking</div>
        </div>
            {/*<img src="path/to/image.jpg" alt="Pop-up Image" />  */}
            <button id="close-btn" onClick={() => closePopup( 'main-page', 'hog-screen', 'hog', 'hog_vid')}> &#10006;</button>
          </div>
      </div>

      
      <div id="grab-screen" className="popup-screen" style={{ display: popup_open ? 'block' : 'none' }} >
        <div id="grab" className="popup">
          <div className="title-section">
            <h2>AR Grab</h2>
          </div>
          <div className="video-section">
            <iframe id ="grab_vid" src='https://www.youtube.com/embed/5HpyiNAV0Nc?mute=1'
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
              width="100%" height="600">
            </iframe>
          </div>
          <div></div>
        <div className="skills-section">
          <div className="skill">JavaScript</div>
          <div className="skill">HandTracking</div>
          <div className="skill">LensStudio</div>
        </div>
            {/*<img src="path/to/image.jpg" alt="Pop-up Image" />  */}
            <button id="close-btn" onClick={() => closePopup( 'main-page', 'grab-screen', 'grab', 'grab_vid')}> &#10006;</button>
          </div>
      </div>

      
      <div id="ball-screen" className="popup-screen" style={{ display: popup_open ? 'block' : 'none' }} >
        <div id="ball" className="popup">
          <div className="title-section">
            <h2>Paper Football</h2>
          </div>
          <div className="video-section">
            <iframe id ="ball_vid" src='https://www.youtube.com/embed/vf1UEUdOKYY?mute=1'
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
              width="100%" height="600">
            </iframe>
          </div>
          <div></div>

          <a id="try-button" href="https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=3e221eaefbc7461e8ddc74d19e334653&metadata=01" 
          target="_blank"  rel="noopener noreferrer"> Try it Out
          </a>
          <div className="spacer-skills"></div>
        <div className="skills-section">
          <div className="skill">HandTracking</div>
          <div className="skill">JavaScript</div>
          <div className="skill">Collision Detection</div>
          <div className="skill">AR Game</div>
        </div>
            {/*<img src="path/to/image.jpg" alt="Pop-up Image" />  */}
            <button id="close-btn" onClick={() => closePopup( 'main-page', 'ball-screen', 'ball', 'ball_vid')}> &#10006;</button>
          </div>
      </div> 

      <div id="email-screen" className="popup-screen" style={{ display: popup_open ? 'block' : 'none' }} >
        <div id="email" className="contact-popup">

            <div className="spacer"></div>
            <div className='email_content'>
              <div className="email_design_container">
                <form ref={form} onSubmit={sendEmail}>
                  <input type="text" name="user_name" className="name_text" placeholder="Name"/>     
                  <input type="email" name="user_email" className="email_text" placeholder="Email" />      
                  <textarea name="message" className="message_text" placeholder="Message"/>
                  <input type="submit" value="Send"  className="submit_text"  
                  onClick={() => {bounceButton();
                  closePopup( 'main-page', 'email-screen', 'email', null)}}/>
                </form>
              </div>
            </div>
            <div className='icon_content'>
              <div className="icons">
                <a className="snapchat" href="https://lensstudio.snapchat.com/creator/d6TqmX7QKsLE-FU_u9UXwQ" target="_blank" rel="noopener noreferrer"> </a>
                <a className="linkedin" href="https://www.linkedin.com/in/enoch-ajagbe/" target="_blank" rel="noopener noreferrer"> </a>
                <a className="instagram" href="https://www.instagram.com/enoch.dev/" target="_blank" rel="noopener noreferrer"> </a>
              </div>
            </div>
       

            {/*<img src="path/to/image.jpg" alt="Pop-up Image" />  */}
            <button id="close-btn" onClick={() => closePopup( 'main-page', 'email-screen', 'email', null)}> &#10006;</button>
          </div>
      </div> 
    </div>
  )
};