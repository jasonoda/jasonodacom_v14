export default class ImageOb {
    constructor(src, width, height, parent = document.body) {
        this.src = src;
        this.width = width;
        this.height = height;
        this.parent = parent;

        this.createElements();
        this.observeVisibility();
    }

    createElements() {
        
        this.container = document.createElement("div");
        this.container.style.position = "relative";
        this.container.style.width = `${this.width}px`;
        this.container.style.height = `${this.height}px`;
        // this.container.style.top = "2000px";
        this.container.style.left = "0px";
        this.container.style.overflow = "hidden";
        this.container.style.borderRadius="8px"
        this.container.style.marginBottom="7px"
        this.container.style.zIndex = "1000";
        this.container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        
        this.loader = document.createElement("div");
        this.loader.style.position = "absolute";
        this.loader.style.top = "50%";
        this.loader.style.left = "50%";
        this.loader.style.width = "50px";
        this.loader.style.height = "50px";
        this.loader.style.borderRadius = "50%";
        this.loader.style.background = "conic-gradient(white 10%, transparent 90%)";
        this.loader.style.animation = "rotate 1s linear infinite";
        this.loader.style.transform = "translate(-50%, -50%)";
        this.loader.style.opacity = "1";

        this.image = document.createElement("img");
        this.image.src = "";
        this.image.style.width = "100%";
        this.image.style.height = "auto";
        this.image.style.opacity = "0";
        this.image.style.transition = "opacity 1s ease-in-out";

        this.container.appendChild(this.loader);
        this.container.appendChild(this.image);
        this.parent.appendChild(this.container);

    }

    observeVisibility() {
        if (!this.container) {
            console.error("Container is missing!");
            return;
        }
    
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    const rect = entry.boundingClientRect;
                    const isNearViewport = rect.top < window.innerHeight + 1000;
    
                    if (isNearViewport) {
                        // console.log("Image is close! Loading now:", this.container);
                        this.loadImage();
                        observer.unobserve(this.container);
                    }
                });
            },
            { threshold: 0 }
        );
    
        observer.observe(this.container);
    }
    

    loadImage() {
        console.log("load an image")
        this.image.src = this.src;
        this.image.onload = () => {
            // setTimeout(() => {
                this.image.style.opacity = "1";
                this.loader.style.opacity = "0"; 
            // }, 1000);
        };
    }
}

const style = document.createElement("style");
style.innerHTML = `
    @keyframes rotate {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(style);
