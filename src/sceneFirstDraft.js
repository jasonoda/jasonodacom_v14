import * as THREE from 'three';
import gsap from 'gsap';
import ImageOb from "./imageOb.js";

export class Scene {
    
    setUp(e) {
  
      this.e=e;

      this.scrollSpeed=1;

    }
  
    buildScene(){

      this.mainDiv = new THREE.Group();
      this.e.scene3D.add(this.mainDiv)

      this.dl_shad = new THREE.DirectionalLight(0xffffff, .75);
      this.dl_shad.position.x=12*3;
      this.dl_shad.position.z=-26*3;
      this.dl_shad.position.y=26*3;
      this.mainDiv.add(this.dl_shad);

      this.dl_shad.castShadow=true;

      this.dl_shad.shadow.mapSize.width = 4096;
      this.dl_shad.shadow.mapSize.height = 4096;
      // this.dl_shad.shadow.bias = .001;
      
      this.e.sSize = 11;
      this.dl_shad.shadow.camera.near = 0.1; 
      this.dl_shad.shadow.camera.far = 180;
      this.dl_shad.shadow.camera.left = -this.e.sSize;
      this.dl_shad.shadow.camera.right = this.e.sSize;
      this.dl_shad.shadow.camera.top = this.e.sSize;
      this.dl_shad.shadow.camera.bottom = -this.e.sSize;
      this.dl_shad.shadow.radius = 2;

      // const shadowHelper = new THREE.CameraHelper(this.dl_shad.shadow.camera);
      // this.mainDiv.add(shadowHelper);

      // ambient light

      this.ambLight = new THREE.AmbientLight( 0xffffff, .75 );
      this.mainDiv.add( this.ambLight );

      //---PLAYER------------------------------------------------------------------------------------------------------

      this.playerCont = new THREE.Group();
      this.mainDiv.add(this.playerCont)
      this.playerCont.position.y=0;
      this.playerCont.position.z=0;
      this.playerCont.position.x=0;

      //---SCENE------------------------------------------------------------------------------------------------------

      var geometry = new THREE.BoxGeometry();
      var material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      this.box = new THREE.Mesh(geometry, material);
      this.box.castShadow=true;
      this.box.receiveShadow=true;
      this.box.position.y=.5;
      this.mainDiv.add(this.box);

      geometry = new THREE.PlaneGeometry(5,5);
      material = new THREE.MeshStandardMaterial({ color: 0x333333 });
      this.floor = new THREE.Mesh(geometry, material);
      this.floor.rotation.x = this.e.u.ca(-90);
      this.floor.castShadow=true;
      this.floor.receiveShadow=true;
      this.mainDiv.add(this.floor);

      //

      this.mainDiv = document.getElementById("mainDiv");
      this.reel = document.getElementById("reel"); this.showReel = true;

      this.heightSetter = document.createElement("div");
      this.heightSetter.style.height = "30000px";
      // this.heightSetter.style.border = "1px solid red";
      this.heightSetter.style.width = "110px";
      document.body.appendChild(this.heightSetter);

      //

      this.myScroll = 0;
      
      //

      this.cursor = document.getElementById("cursor");
      this.cursor2 = document.getElementById("cursor2");

      this.cursorX = 0;
      this.cursorY = 0;
      this.targetCursorX = 0;
      this.targetCursorY = 0;

      this.cursorX2 = 0;
      this.cursorY2 = 0;
      this.targetCursorX2 = 0;
      this.targetCursorY2 = 0;

      document.addEventListener("mousemove", (event) => {
          this.targetCursorX = event.clientX - this.cursor.offsetWidth/2;
          this.targetCursorY = event.clientY - this.cursor.offsetHeight/2 -80;
          this.targetCursorX2 = event.clientX - this.cursor2.offsetWidth/2;
          this.targetCursorY2 = event.clientY - this.cursor2.offsetHeight/2 -80;
      });

      this.fadeItems = [];

      //--------------------------------------------------------------------------------------------------------------

      this.ob = this.createTitle("WAKING", this.mainDiv);  this.fadeItems.push(this.ob); this.ob.id = "wakingSection";

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Waking is an emotional action / adventure indie game funded by Microsoft via the ID@Xbox program.", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.createYoutubeEmbed("https://www.youtube.com/embed/24KuXRQPt6A", this.mainDiv); this.fadeItems.push(this.ob);

      this.createSpacer(30 , this.mainDiv);

      this.ob = this.createIcon("./src/images/symbols/tri.svg", this.mainDiv); this.fadeItems.push(this.ob);
      // this.ob = this.createDisc("Unity - Steam and Xbox.", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createSpacer(36 , this.mainDiv);

      this.createNewLine(this.mainDiv);

      this.ob = new ImageOb("./src/images/waking/gif1small.gif", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/waking/gif2small.gif", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/waking/wakingSplash.png", 1000, 550, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/waking/waking2.png", 1000, 470, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/waking/waking9.png", 1000, 470, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/waking/waking6.png", 1000, 550, this.mainDiv); this.fadeItems.push(this.ob.container);
      // this.ob = new ImageOb("./src/images/waking/waking3.jpg", 1000, 470, this.mainDiv); this.fadeItems.push(this.ob.container);
      // this.ob = new ImageOb("./src/images/waking/waking7.png", 1000, 470, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/waking/waking8.png", 1000, 470, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/waking/waking5.png", 1000, 470, this.mainDiv); this.fadeItems.push(this.ob.container);

      this.createSpacer(30 , this.mainDiv);

      this.ob = this.createIcon("./src/images/symbols/tri.svg", this.mainDiv); this.fadeItems.push(this.ob);
      
      this.createSpacer(220 , this.mainDiv);

      //--------------------------------------------------------------------------------------------------------------

      this.ob = this.createTitle("GAGGIA", this.mainDiv);  this.fadeItems.push(this.ob); this.ob.id = "gaggiaSection";

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Responsive Website - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createYoutubeEmbed("https://www.youtube.com/embed/GNEMO4_y7M8", this.mainDiv); this.fadeItems.push(this.ob);this.createSpacer(30 , this.mainDiv);

      this.ob = this.createIcon("./src/images/symbols/tri.svg", this.mainDiv); this.fadeItems.push(this.ob);
      
      this.createSpacer(36 , this.mainDiv);

      this.createNewLine(this.mainDiv);

      this.ob = new ImageOb("./src/images/gaggia/gaggia1.png", 1000, 500, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/gaggia/gaggia2.png", 1000, 500, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/gaggia/gaggia3.png", 1000, 500, this.mainDiv); this.fadeItems.push(this.ob.container);

      this.createSpacer(30 , this.mainDiv);

      this.ob = this.createIcon("./src/images/symbols/tri.svg", this.mainDiv); this.fadeItems.push(this.ob);
      
      this.createSpacer(220 , this.mainDiv);

      //--------------------------------------------------------------------------------------------------------------

      this.ob = this.createTitle("SCHNEIDER", this.mainDiv);  this.fadeItems.push(this.ob); this.ob.id = "schneiderSection";

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Responsive Website - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createYoutubeEmbed("https://www.youtube.com/embed/GNEMO4_y7M8", this.mainDiv); this.fadeItems.push(this.ob);this.createSpacer(30 , this.mainDiv);

      this.ob = this.createIcon("./src/images/symbols/tri.svg", this.mainDiv); this.fadeItems.push(this.ob);
      
      this.createSpacer(36 , this.mainDiv);

      this.createNewLine(this.mainDiv);

      this.ob = new ImageOb("./src/images/placeholder.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 1000, 500, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 1000, 500, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 1000, 500, this.mainDiv); this.fadeItems.push(this.ob.container);

      this.createSpacer(30 , this.mainDiv);

      this.ob = this.createIcon("./src/images/symbols/tri.svg", this.mainDiv); this.fadeItems.push(this.ob);
      
      this.createSpacer(220 , this.mainDiv);

      //--------------------------------------------------------------------------------------------------------------

      this.ob = this.createTitle("GAME GALLERY", this.mainDiv);  this.fadeItems.push(this.ob); this.ob.id = "arcadeSection";

      this.createSpacer(36 , this.mainDiv);

      this.createNewLine(this.mainDiv);

      // this.ob = this.createDisc("Responsive Website - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createYoutubeEmbed("https://www.youtube.com/embed/GNEMO4_y7M8", this.mainDiv); this.fadeItems.push(this.ob);this.createSpacer(30 , this.mainDiv);

      this.ob = this.createIcon("./src/images/symbols/tri.svg", this.mainDiv); this.fadeItems.push(this.ob);

      //---------------------------------------
      
      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createTitle("ARCADE GAMES", this.mainDiv);  this.fadeItems.push(this.ob); this.ob.id = "arcadeSection";

      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("PERCH", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = new ImageOb("./src/images/placeholder.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 1000, 500, this.mainDiv); this.fadeItems.push(this.ob.container);

      //---------------------------------------
      
      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("MAGEBOY", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = new ImageOb("./src/images/placeholder.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 1000, 500, this.mainDiv); this.fadeItems.push(this.ob.container);

      //---------------------------------------
      
      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("SLAYGROUND", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = new ImageOb("./src/images/placeholder.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 1000, 500, this.mainDiv); this.fadeItems.push(this.ob.container);

      this.createSpacer(220 , this.mainDiv);

      //--------------------------------------------------------------------------------------------------------------

      //---------------------------------------
      
      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createTitle("MUSIC GAMES", this.mainDiv);  this.fadeItems.push(this.ob); this.ob.id = "musicSection";

      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("SKRILLEX QUEST", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.createYoutubeEmbed("https://www.youtube.com/embed/BffXQcGQUNI", this.mainDiv); this.fadeItems.push(this.ob); 
      this.createSpacer(30 , this.mainDiv);

      this.ob = new ImageOb("./src/images/skrillex/cart.png", 282, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/skrillex/image227.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/skrillex/skril7.png", 207, 278, this.mainDiv); this.fadeItems.push(this.ob.container);

      this.ob = new ImageOb("./src/images/skrillex/skril2.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/skrillex/skril3.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/skrillex/skril4.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/skrillex/skril5.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/skrillex/skril6.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/skrillex/skril8.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);

      //---------------------------------------
      
      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("WEEZER", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.createYoutubeEmbed("https://www.youtube.com/embed/QhWLtD4gyQI", this.mainDiv); this.fadeItems.push(this.ob); 
      this.createSpacer(30 , this.mainDiv);

      this.ob = new ImageOb("./src/images/weezer/w1.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/weezer/w2.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/weezer/w3.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/weezer/w4.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);

      //---------------------------------------
      
      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("CLUE", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = new ImageOb("./src/images/placeholder.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/placeholder.png", 1000, 500, this.mainDiv); this.fadeItems.push(this.ob.container);

      //---------------------------------------
      
      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("FALL OUT BOY", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.createYoutubeEmbed("https://www.youtube.com/embed/MNlnPvlthI0", this.mainDiv); this.fadeItems.push(this.ob); 
      this.createSpacer(30 , this.mainDiv);

      this.ob = new ImageOb("./src/images/fob/fobBig3.jpg", 397, 433, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/fob/fobBig1.jpg", 397, 433, this.mainDiv); this.fadeItems.push(this.ob.container);

      this.createSpacer(220 , this.mainDiv);

      //--------------------------------------------------------------------------------------------------------------

      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createTitle("ADVERGAMES", this.mainDiv);  this.fadeItems.push(this.ob); this.ob.id = "advergameSection";

      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("EXPEDIA", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = new ImageOb("./src/images/commercial/exp7.jpg", 400, 531, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/commercial/exp8.jpg", 400, 531, this.mainDiv); this.fadeItems.push(this.ob.container);

      this.ob = new ImageOb("./src/images/commercial/exp9.jpg", 210, 300, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/commercial/exp10.jpg", 210, 300, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/commercial/exp11.jpg", 210, 300, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/commercial/exp5.jpg", 210, 300, this.mainDiv); this.fadeItems.push(this.ob.container);

      //--------------------------------------------------------------------------------------------------------------

      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("HOTELS.COM", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.createYoutubeEmbed("https://www.youtube.com/embed/MLq0JVJ5HaU", this.mainDiv); this.fadeItems.push(this.ob); 
      this.createSpacer(30 , this.mainDiv);

      this.ob = new ImageOb("./src/images/commercial/hotel1.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/commercial/hotel2.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/commercial/hotel3.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/commercial/hotel4.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);

      //--------------------------------------------------------------------------------------------------------------

      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("CALL OF DUTY", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.createYoutubeEmbed("https://www.youtube.com/embed/GeLI2UXObz0", this.mainDiv); this.fadeItems.push(this.ob); 
      this.createSpacer(30 , this.mainDiv);

      this.ob = new ImageOb("./src/images/cod/cod2.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/cod/cod3.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/cod/cod4.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/cod/cod5.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);

      //--------------------------------------------------------------------------------------------------------------

      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("MEOW MIX", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = new ImageOb("./src/images/commercial/cat1.jpg", 801, 401, this.mainDiv); this.fadeItems.push(this.ob.container);

      this.ob = new ImageOb("./src/images/commercial/cat2.jpg", 496, 220, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/commercial/cat3.jpg", 496, 220, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/commercial/cat4.jpg", 496, 220, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/commercial/cat5.jpg", 496, 220, this.mainDiv); this.fadeItems.push(this.ob.container);

      this.createSpacer(30 , this.mainDiv);

      this.ob = this.createIcon("./src/images/symbols/tri.svg", this.mainDiv); this.fadeItems.push(this.ob);
      
      this.createSpacer(220 , this.mainDiv);

      //--------------------------------------------------------------------------------------------------------------

      this.createSpacer(36 , this.mainDiv);

      this.ob = this.createSubTitle("CONTINUE?9876543210", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.ob = this.createDisc("Game - WebGL / three.js", this.mainDiv);  this.fadeItems.push(this.ob);

      this.createNewLine(this.mainDiv);

      this.createYoutubeEmbed("https://www.youtube.com/embed/lS_RhOKBkCA", this.mainDiv); this.fadeItems.push(this.ob); 
      this.createSpacer(30 , this.mainDiv);

      this.ob = new ImageOb("./src/images/continue/cont9.jpg", 278, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/cont2.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/cont13b.jpg", 206, 278, this.mainDiv); this.fadeItems.push(this.ob.container);

      this.ob = new ImageOb("./src/images/continue/cont6.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/cont12.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/cont3.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/cont7.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/cont8.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/cont5.jpg", 496, 278, this.mainDiv); this.fadeItems.push(this.ob.container);

      this.ob = new ImageOb("./src/images/continue/cont10.jpg", 136, 300, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/cont11.jpg", 136, 300, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/eden.jpg", 136, 300, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/layla.jpg", 136, 300, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/maggie.jpg", 136, 300, this.mainDiv); this.fadeItems.push(this.ob.container);
      this.ob = new ImageOb("./src/images/continue/simon.jpg", 136, 300, this.mainDiv); this.fadeItems.push(this.ob.container);

      //---------------------------------------

      this.secOffset = 150;

      document.getElementById("reelButton").addEventListener("click", (event) => {

        event.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});

      });

      this.wakingDown = document.getElementById('wakingSection').offsetTop - this.secOffset;
      document.getElementById("wakingButton").addEventListener("click", (event) => {

        event.preventDefault();
        window.scrollTo({top: this.wakingDown*this.scrollSpeed, behavior: 'smooth'});

      });

      this.gaggiaDown = document.getElementById('gaggiaSection').offsetTop - this.secOffset;
      document.getElementById("gaggiaButton").addEventListener("click", (event) => {

        event.preventDefault();
        window.scrollTo({ top: this.gaggiaDown*this.scrollSpeed,behavior: 'smooth' });

      });

      //--------------------------------------------------------------------------------------------------------------

      this.fadeItems.forEach((myOb) => {
        myOb.showing=false;
        myOb.style.opacity=0;
      });

      // this.ob.style.zIndex=1000;

    }

    createTitle(text, parent){

      var myTitle = document.createElement("div"); myTitle.textContent = text; myTitle.classList.add("t1"); parent.appendChild(myTitle);

      return myTitle;

    }

    createSubTitle(text, parent){

      var myTitle = document.createElement("div"); myTitle.textContent = text; myTitle.classList.add("t3"); parent.appendChild(myTitle);

      return myTitle;

    }

    createDisc(text, parent){

      var myDisc = document.createElement("div"); myDisc.textContent = text; myDisc.classList.add("t2"); parent.appendChild(myDisc);

      return myDisc;

    }

    createNewLine(parent) {
      let newLine = document.createElement("div");
      newLine.style.width = "100%"; 
      newLine.style.height = "0px"; 
      parent.appendChild(newLine);
    }

    createSpacer(height, parent){

      var mySpacer = document.createElement("div");  mySpacer.style.height = height+"px"; parent.appendChild(mySpacer);
      mySpacer.classList.add("spacer");
      return mySpacer;

    }

    createIcon(src, parent) {
      const container = document.createElement("div");
      container.classList.add("iconContainer");
  
      const img = document.createElement("img");
      img.src = src;
      img.classList.add("iconImage");
  
      container.appendChild(img);
      parent.appendChild(container);
  
      return container;
    }

    createYoutubeEmbed(url, parent) {
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.classList.add("youtubeEmbed"); 
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "true");
      parent.appendChild(iframe);
      return iframe;
    }

    update(){

      // cursor

      //---------------------------------------------------------------------------------------------------------------------------------------

      this.cursorX = this.e.u.lerp(this.cursorX, this.targetCursorX, 0.15);
      this.cursorY = this.e.u.lerp(this.cursorY, this.targetCursorY, 0.15);

      this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;

      this.cursorX2 = this.e.u.lerp(this.cursorX2, this.targetCursorX2, 0.08);
      this.cursorY2 = this.e.u.lerp(this.cursorY2, this.targetCursorY2, 0.08);

      this.cursor2.style.transform = `translate(${this.cursorX2}px, ${this.cursorY2}px)`;

      //---------------------------------------------------------------------------------------------------------------------------------------

      // scroll

      this.myScroll = this.e.u.lerp( this.myScroll, document.documentElement.scrollTop, .1 );
      this.mainDiv.style.transform = `translateX(-50%) translateY(${-this.myScroll/this.scrollSpeed}px)`;

      // console.log(document.documentElement.scrollTop)

      //---------------------------------------------------------------------------------------------------------------------------------------

      this.showReelScroll=100;

      if(this.myScroll>this.showReelScroll && this.showReel===true){

        gsap.killTweensOf(this.reel);
        gsap.to(this.reel, { duration: .25, opacity: 0, ease: "sine.out" });
        this.showReel=false;

      }else if(this.myScroll<=this.showReelScroll && this.showReel===false){

        gsap.killTweensOf(this.reel);
        gsap.to(this.reel, { duration: .25, opacity: 1, ease: "sine.out" });
        this.showReel=true;

      }

      if(this.reel.style.opacity==="0"){

          this.reel.style.pointerEvents="none"

          if(this.reel.readyForReload===true){
            let src = this.reel.src;
            this.reel.src = "";
            this.reel.src = src;
            this.reel.readyForReload=false;
          }
          
      }else{

        this.reel.style.pointerEvents="auto"
        this.reel.readyForReload=true;

      }

      //---------------------------------------------------------------------------------------------------------------------------------------

      this.windowHeight = window.innerHeight;

      for(var i=0; i<this.fadeItems.length; i++){

        var item = this.fadeItems[i];

        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < this.windowHeight-100;

        if (isVisible===false && item.showing===false) {

          gsap.killTweensOf(item);
          gsap.to(item, { duration: .5, delay: .2, opacity: 0, ease: "sine.out" });
          item.showing=true;

        } else if(isVisible===true && item.showing===true){
              
          gsap.killTweensOf(item);
          gsap.to(item, { duration: .5, delay: .2, opacity: 1, ease: "sine.out" });
          item.showing=false;

        }

      };

      //---------------------------------------------------------------------------------------------------------------------------------------

      // console.log(document.documentElement.scrollTop)
        
      this.mixer()

    }

    mixer(){

      if(document.getElementById("mix").checked === true){
  
          //-------------------------------------
  
          var c1_H = document.getElementById("c1_H").value;
          var c1_S = document.getElementById("c1_S").value;
          var c1_L = document.getElementById("c1_L").value;
  
          document.getElementById("c1_Color").value = this.e.u.hslToHex(c1_H,c1_S,c1_L);
          // this.rig.material.color.setHex( "0x"+this.e.u.hslToHex(c1_H,c1_S,c1_L) );
  
          //-------------------------------------
  
          var c2_H = document.getElementById("c2_H").value;
          var c2_S = document.getElementById("c2_S").value;
          var c2_L = document.getElementById("c2_L").value;
  
          document.getElementById("c2_Color").value = this.e.u.hslToHex(c2_H,c2_S,c2_L);
          // this.roofBars.material.color.setHex( "0x"+this.e.u.hslToHex(c2_H,c2_S,c2_L) );
          
          //-------------------------------------
  
          var c3_H = document.getElementById("c3_H").value;
          var c3_S = document.getElementById("c3_S").value;
          var c3_L = document.getElementById("c3_L").value;
  
          document.getElementById("c3_Color").value = this.e.u.hslToHex(c3_H,c3_S,c3_L);
          // this.roofEdge.material.color.setHex( "0x"+this.e.u.hslToHex(c3_H,c3_S,c3_L) );
          
          //-------------------------------------
  
          var c4_H = document.getElementById("c4_H").value;
          var c4_S = document.getElementById("c4_S").value;
          var c4_L = document.getElementById("c4_L").value;
  
          document.getElementById("c4_Color").value = this.e.u.hslToHex(c4_H,c4_S,c4_L);
          // this.ambLight.color.setHex( "0x"+this.e.u.hslToHex(c4_H,c4_S,c4_L) );
  
          //-------------------------------------
  
          var c5_H = document.getElementById("c5_H").value;
          var c5_S = document.getElementById("c5_S").value;
          var c5_L = document.getElementById("c5_L").value;
  
          document.getElementById("c5_Color").value = this.e.u.hslToHex(c5_H,c5_S,c5_L);
  
          //-------------------------------------
  
          var num1 = document.getElementById("num1").value;
          var num2 = document.getElementById("num2").value;
          var num3 = document.getElementById("num3").value;
  
          // this.dl_shad.position.x = num1;
          // this.dl_shad.position.z = num2;
          // this.dl_shad.position.y = num3;
  
      }

    }

}