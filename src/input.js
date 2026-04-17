export class Input {
    
    setUp(e) {
  
        this.e=e;
  
        this.keyRight = false;
        this.keyLeft = false;
        this.keyUp = false;
        this.keyDown = false;

        const versionOverlay = document.createElement("div");
        versionOverlay.id = "versionOverlay";
        versionOverlay.textContent = "v1.1";
        versionOverlay.setAttribute("aria-hidden", "true");
        document.body.appendChild(versionOverlay);
  
        document.addEventListener("keydown", event => {

          if (event.key === "v" || event.key === "V") {
            const t = event.target;
            const tag = t && t.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || (t && t.isContentEditable)) {
              return;
            }
            event.preventDefault();
            versionOverlay.classList.toggle("is-visible");
            versionOverlay.setAttribute(
              "aria-hidden",
              versionOverlay.classList.contains("is-visible") ? "false" : "true"
            );
            return;
          }
  
          //---arrow keyes---------------------------------------
  
          if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
  
              this.keyRight = true;
  
          } else if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
  
              this.keyLeft = true;
  
          } else if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
  
              this.keyUp = true;
  
          } else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
  
              this.keyDown = true;
  
          }
  
        });
  
        document.addEventListener("keyup", event => {
  
          //---arrow keyes---------------------------------------
  
          if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
  
              this.keyRight = false;
  
          } else if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
  
              this.keyLeft = false;
  
          } else if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
  
              this.keyUp = false;
  
          } else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
  
              this.keyDown = false;
  
          }
  
      });
  
    }
  
  }