import * as THREE from 'three';

export default class Engine{
    constructor(back,input, loader, scene, sounds, utilities, ui){

        this.back = back;
        this.input = input;
        this.loader = loader;
        this.s = sounds;
        this.scene = scene;
        this.ui = ui;
        this.u = utilities;

        this.mobile = false;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) || window.innerWidth<600) {
            this.mobile = true;
        }

        var testUA = navigator.userAgent;

        if(testUA.toLowerCase().indexOf("android") > -1){
            this.mobile = true;
        }

        this.action = "set up";
        this.count = 0;

    }

    start(){
        
    }

    update(){

        //---deltatime--------------------------------------------------------------------------------------------------------------

        var currentTime = new Date().getTime();
        this.dt = (currentTime - this.lastTime) / 1000;
        if (this.dt > 1) {
            this.dt = 0;
        }
        this.lastTime = currentTime;

        document.getElementById("feedback").innerHTML = this.action +" / "+ this.scene.action;

        if(this.action==="set up"){

            this.action="load images";

        }else if(this.action==="load images"){

            // this.ui.load();
            this.action="wait for images";

        }else if(this.action==="wait for images"){

            // if(this.ui.isLoaded_UI===true){
                this.action="load 3d";
            // }

        }else if(this.action==="load 3d"){

            this.loader.load();
            this.action="loading 3d";

        }else if(this.action==="loading 3d"){

            if(this.loader.isLoaded_3DTEXTURES===true && this.loader.isLoaded_3D===true && this.loader.isLoaded_CUBE===true){
                this.action="wait before build";
            }

        }else if(this.action==="wait before build"){

            this.count+=this.dt;
            if(this.count>.1){
                this.count=0;
                this.action="build"
            }

        }else if(this.action==="build"){

            this.scene.buildScene();
            this.back.buildScene();

            // window.addEventListener("resize", () => {
            //     this.resize3D();
            // })

            this.count=0;
            this.action="wait";

        }else if(this.action==="wait"){

            // fade out loading graphic

            // this.loadWords-=this.dt;
            // document.getElementById("loadingImage").style.opacity = this.loadWords+""

            // loop

            // this.ui.update();
            // this.scene.update();

            // end

            this.count+=this.dt;
            if(this.count>1){
                this.count=0;
                this.action="go"
                this.scene.action="start"
            }

        }else if(this.action==="go"){

            // fade out loading cover

            // this.loadBack-=this.dt;
            // if(this.loadBack.opacity<0){
            //     this.loadBack.opacity=0;
            // }
            // document.getElementById("loadingBack").style.opacity = this.loadBack+""

            // loops

            this.back.update();
            this.scene.update();
            // this.ui.update();
            this.render();

        }

    }

    render(){
        
        //---renderer--------------------------------------------------------------------------------------------------------------

        this.back.renderer.render(this.back.scene3D, this.back.camera);
        // this.renderer.render(this.scene3D, this.camera);

    }

}