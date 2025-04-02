import * as THREE from 'three';
import gsap from 'gsap';
import ImageOb from "./imageOb.js";

export class Scene {
    
    setUp(e) {
  
      this.e=e;


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

      //---------------------------------------------------------------------------------------------------------------------------------------
      
      this.heightSetter = document.createElement("div");
      this.heightSetter.style.height = "3000px";
      this.heightSetter.style.width = "110px";
      document.body.appendChild(this.heightSetter);

      //---------------------------------------------------------------------------------------------------------------------------------------
      
      document.getElementById("reelButton").addEventListener("click", (event) => {

        event.preventDefault();
        this.toSection = "reel";
        this.action = "fade";

      });

      document.getElementById("wakingButton").addEventListener("click", (event) => {

        event.preventDefault();
        this.toSection = "waking";
        this.action = "fade";

      });

      document.getElementById("gaggiaButton").addEventListener("click", (event) => {

        event.preventDefault();
        this.toSection = "gaggia";
        this.action = "fade";

      });

      document.getElementById("schneiderButton").addEventListener("click", (event) => {

        event.preventDefault();
        this.toSection = "schneider";
        this.action = "fade";

      });

      document.getElementById("arcadeButton").addEventListener("click", (event) => {

        event.preventDefault();
        this.toSection = "arcade";
        this.action = "fade";

      });

      document.getElementById("musicButton").addEventListener("click", (event) => {

        event.preventDefault();
        this.toSection = "music";
        this.action = "fade";

      });

      document.getElementById("advergamesButton").addEventListener("click", (event) => {

        event.preventDefault();
        this.toSection = "advergames";
        this.action = "fade";

      });

      document.getElementById("continueButton").addEventListener("click", (event) => {

        event.preventDefault();
        this.toSection = "continue";
        this.action = "fade";

      });

      document.getElementById("perfectStrangersButton").addEventListener("click", (event) => {

        event.preventDefault();
        this.toSection = "perfectstrangers";
        this.action = "fade";

      });

      document.getElementById("printButton").addEventListener("click", (event) => {

        event.preventDefault();
        this.toSection = "print";
        this.action = "fade";

      });

      //---------------------------------------------------------------------------------------------------------------------------------------
      
      this.fadeItems = [
        ...this.mainDiv.querySelectorAll('.linkDiv'),
        ...this.mainDiv.querySelectorAll('.textDiv'),
        ...this.mainDiv.querySelectorAll('.imageCont'),
        ...this.mainDiv.querySelectorAll('.imageDiv'),
        ...this.mainDiv.querySelectorAll('.divHalf'),
        ...this.mainDiv.querySelectorAll('.dbar-parent'),
        ...this.mainDiv.querySelectorAll('.videoContainer')
      ];

      this.fadeItems.forEach((myOb) => {
        myOb.showing=false;
        myOb.style.opacity=0;
      });

      //--------------------------------------------------------------------------------------------------------------

      // this.setPage("reel")

      this.scrollSpeed=1;
      this.myScroll=0;
      this.count=0;

    }

    update(){

      // smooth scroll
      
      this.myScroll = this.e.u.lerp( this.myScroll, document.documentElement.scrollTop, .1 );
      this.mainDiv.style.transform = `translateY(${-this.myScroll/this.scrollSpeed}px)`;

      // set height setter

      this.heightSetter.style.height = `${this.mainDiv.scrollHeight}px`;

      // actions

      if(this.action==="wait"){

        //

      }else if(this.action==="start"){

        this.action="show logo";

      }else if(this.action==="show logo"){

        this.centerLogo = document.createElement('object');
        this.centerLogo.type = 'image/svg+xml';
        this.centerLogo.data = 'src/images/logo2.svg';
        this.centerLogo.id = 'centerLogo';
    
        document.body.appendChild(this.centerLogo);

        this.count = 0;
        this.action = "show logo wait";

      }else if(this.action==="show logo wait"){

        this.count+=this.e.dt;
        if(this.count>4){

          gsap.to(this.centerLogo, { duration: 1, opacity: 0, ease: "linear" });

          this.count=0;
          this.action="hide logo wait";

        }

      }else if(this.action==="hide logo wait"){

        this.count+=this.e.dt;
        if(this.count>1){

          this.count=0;
          this.action="show bar";

        }

      }else if(this.action==="show bar"){

        document.getElementById("topBar").style.height = "0px";
        gsap.to(document.getElementById("topBar"), { duration: .75, height: "50px", ease: "quint.inOut" });

        // document.getElementById("bgCont").style.height = "0%";
        // gsap.to(document.getElementById("bgCont"), { duration: .25, delay: 1, height: "100%", ease: "linear" });
        // gsap.to(document.getElementById("bgCont"), { duration: .25, delay: 1, opacity: "100%", ease: "linear" });

        this.action="show bar wait";

      }else if(this.action==="show bar wait"){

        this.count+=this.e.dt;

        if(this.count>.75){
          this.count=0;
          this.action="show buttons";
        }

      }else if(this.action==="show buttons"){

        document.getElementById("topBarGrad").style.opacity = "0";
        gsap.to(document.getElementById("topBarGrad"), { duration: .25, opacity: 1, ease: "linear" });

        gsap.to(document.getElementById("logo"), { duration: .25, opacity: 1, ease: "linear" });

        this.linkButtons = Array.from(document.querySelectorAll('.linkButton'));
        this.linkButtons.push(document.getElementById("tr1"));
        this.linkButtons.push(document.getElementById("tr2"));
        this.linkButtons.push(document.getElementById("tr3"));
        this.linkButtons.push(document.getElementById("tr4"));
        this.linkButtons.push(document.getElementById("tr5"));
        
        for (var i = 0; i < this.linkButtons.length; i++) {
          
          gsap.to(this.linkButtons[i], { duration: 0, opacity: 0});
          gsap.to(this.linkButtons[i], { duration: 0.5, opacity: 1, delay: i * 0.05,ease: "sine.out"});
          
        }

        gsap.to(document.getElementById("bgCont"), { duration: 1, delay: 1.5, opacity: 1});

        document.getElementById("mainDivCont").style.opacity=0;
        gsap.to(document.getElementById("mainDivCont"), { duration: 1, delay: 2, opacity: 1});

        
        this.toSection = "reel";
        this.action="fade"

      }else if(this.action==="fade"){

        gsap.killTweensOf(this.mainDiv);
        gsap.to(this.mainDiv, { duration: .25, opacity: 0, ease: "linear" });

        this.action="fade wait"

      }else if(this.action==="fade wait"){

        this.count+=this.e.dt;

        if(this.count>.25){
          this.count=0;
          this.action="load page";
        }

      }else if(this.action==="load page"){

        window.scrollTo({top: 0 });
        this.myScroll = 0;

        console.log(this.toSection);

        this.setPage(this.toSection)

        gsap.killTweensOf(this.mainDiv);
        gsap.to(this.mainDiv, { duration: .5, opacity: 1, delay:.5, ease: "linear" });

        this.count=0;
        this.action="wait";

      }

      //---------------------------------------------------------------

      this.windowHeight = window.innerHeight;

      for (let i = 0; i < this.fadeItems.length; i++) {
        const item = this.fadeItems[i];
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < this.windowHeight - 100;
      
        if (isVisible && !item.showing) {
          gsap.killTweensOf(item);
          gsap.to(item, { duration: .5, delay: .12, opacity: 1, ease: "sine.out" });
          item.showing = true;
        } else if (!isVisible && item.showing) {
          gsap.killTweensOf(item);
          gsap.to(item, { duration: .5, delay: .12, opacity: 0, ease: "sine.out" });
          item.showing = false;
        }
      }

    }

    setPage(page) {
      fetch("/"+page+".html")

        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const content = doc.querySelector('#container'); // or another container from waking.html
          document.getElementById('mainDiv').innerHTML = content.innerHTML;

          this.fadeItems = [
            ...this.mainDiv.querySelectorAll('.linkDiv'),
            ...this.mainDiv.querySelectorAll('.textDiv'),
            ...this.mainDiv.querySelectorAll('.imageCont'),
            ...this.mainDiv.querySelectorAll('.imageContHalf'),
            ...this.mainDiv.querySelectorAll('.imageSplit'),
            ...this.mainDiv.querySelectorAll('.textDivPrint2'),
            ...this.mainDiv.querySelectorAll('.imageDiv500'),
            ...this.mainDiv.querySelectorAll('.imageDiv'),
            ...this.mainDiv.querySelectorAll('.divHalf'),
            ...this.mainDiv.querySelectorAll('.dbar-parent'),
            ...this.mainDiv.querySelectorAll('.videoContainer'),
            ...this.mainDiv.querySelectorAll('.topDiv')
          ];
    
          this.fadeItems.forEach((item) => {
            item.showing = false;
            item.style.opacity = 0;
          });
        })
        .catch(err => console.error(err));
    }
    
    mixer(){

    }

}