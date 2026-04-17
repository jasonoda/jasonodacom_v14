// scene.js
import * as THREE from 'three';
import gsap from 'gsap';
import ImageOb from "./imageOb.js";

import reelHtml from './reel.html';
import wakingHtml from './waking.html';
import gaggiaHtml from './gaggia.html';
import schneiderHtml from './schneider.html';
import musicHtml from './music.html';
import arcadeHtml from './arcade.html';
import gamesystemsHtml from './gamesystems.html';
import advergamesHtml from './advergames.html';
import continueHtml from './continue.html';
import perfectstrangersHtml from './perfectstrangers.html';
import printHtml from './print.html';
import contactHtml from './contact.html';

// Keep keys in sync with SECTION_PAGE_HTML in webpack.config.js (copy to dist).
const PAGE_HTML = {
  reel: reelHtml,
  waking: wakingHtml,
  gaggia: gaggiaHtml,
  schneider: schneiderHtml,
  music: musicHtml,
  arcade: arcadeHtml,
  gamesystems: gamesystemsHtml,
  advergames: advergamesHtml,
  continue: continueHtml,
  perfectstrangers: perfectstrangersHtml,
  print: printHtml,
  contact: contactHtml
};

// Temporary dev: set to null to restore the full intro. URL ?skipIntro=1 also skips; ?skipIntro=0 forces intro.
const SKIP_INTRO_TO_SECTION = 'gamesystems';

function getSkipIntroTarget() {
  if (typeof window === 'undefined') return null;
  const p = new URLSearchParams(window.location.search);
  if (p.get('skipIntro') === '0') return null;
  if (p.get('skipIntro') === '1' || p.get('skipIntro') === 'gamesystems') return 'gamesystems';
  return SKIP_INTRO_TO_SECTION;
}

export class Scene {
  setUp(e) {
    this.e = e;
    this.linkConfig = {
      reel: [0xff0000, 0],
      waking: [0x00d3ff, 90],
      gaggia: [0xff0000, 0],
      schneider: [0x05fcf9, 270],
      music: [0x00d3ff, 0],
      arcade: [0xf600ff, 180],
      gamesystems: [0xff8800, 135],
      advergames: [0xff0000, 180],
      continue: [0x00d3ff, 90],
      perfectstrangers: [0xf600ff, 180],
      print: [0x999999, 270],
      contact: [0x999999, 90]
    };
  }

  buildScene() {
    this.mainDiv = document.getElementById("mainDiv");

    this.heightSetter = document.createElement("div");
    this.heightSetter.style.height = "3000px";
    this.heightSetter.style.width = "110px";
    document.body.appendChild(this.heightSetter);

    const handleNavClick = (section) => {
      this.toSection = section;
      this.action = "fade";
      const [color, angle] = this.linkConfig[section] || [0xffffff, 0];
      this.e.back.changeColors(color, angle);
      const menu = document.getElementById("hamburgerMenu");
      if (menu) menu.style.display = "none";
    };

    Object.keys(this.linkConfig).forEach((key) => {
      const el = document.getElementById(`${key}Button`);
      if (el) {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          handleNavClick(key);
        });
      }
    });

    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("hamburgerMenu");
    if (hamburger && menu) {
      hamburger.addEventListener("click", () => {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
      });
      menu.querySelectorAll(".hamburgerLink").forEach(link => {
        const section = link.getAttribute("data-section");
        link.addEventListener("click", () => handleNavClick(section));
      });
    }

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
      myOb.showing = false;
      myOb.style.opacity = 0;
    });

    if (this.e.mobile === true) {
      document.getElementById("logo").src = "src/images/logo2Still.svg";
    }

    this.hamburger = document.getElementById("hamburger");
    this.hamburgerMenu = document.getElementById("hamburgerMenu");

    this.hamburgerMenu.style.opacity = 1;
    this.hamburgerMenu.style.display = "none";

    this.scrollSpeed = 1;
    this.myScroll = 0;
    this.count = 0;
  }

  applyPostIntroChromeLayout() {
    const topBar = document.getElementById('topBar');
    if (topBar) topBar.style.height = '50px';
    const topBarGrad = document.getElementById('topBarGrad');
    if (topBarGrad) topBarGrad.style.opacity = '1';
    const logo = document.getElementById('logo');
    if (logo) logo.style.opacity = '1';
    const mainDivCont = document.getElementById('mainDivCont');
    if (mainDivCont) mainDivCont.style.opacity = '1';

    if (this.e.mobile === true) {
      this.hamburger.style.display = 'block';
      this.hamburger.style.pointerEvents = 'auto';
      this.hamburger.style.opacity = '1';
    }

    const linkButtons = [
      ...document.querySelectorAll('.linkButton'),
      document.getElementById('tr1'),
      document.getElementById('tr2'),
      document.getElementById('tr3'),
      document.getElementById('tr4'),
      document.getElementById('tr5')
    ];
    for (let i = 0; i < linkButtons.length; i++) {
      if (linkButtons[i]) linkButtons[i].style.opacity = '1';
    }
  }

  update() {

   
    this.myScroll = this.e.u.lerp(this.myScroll, document.documentElement.scrollTop, .1);
    this.mainDiv.style.transform = `translateY(${-this.myScroll / this.scrollSpeed}px)`;
    this.heightSetter.style.height = `${this.mainDiv.scrollHeight}px`;

    if (this.action === "wait") {

    } else if (this.action === "start") {

      const skipSection = getSkipIntroTarget();
      if (skipSection && PAGE_HTML[skipSection]) {
        const [color, angle] = this.linkConfig[skipSection] || [0xffffff, 0];
        this.e.back.changeColors(color, angle);
        this.applyPostIntroChromeLayout();
        this.toSection = skipSection;
        window.scrollTo({ top: 0 });
        this.myScroll = 0;
        gsap.killTweensOf(this.mainDiv);
        const mainDivCont = document.getElementById('mainDivCont');
        if (mainDivCont) gsap.killTweensOf(mainDivCont);
        this.setPage(this.toSection);
        this.mainDiv.style.opacity = 1;
        this.count = 0;
        this.action = 'wait';
      } else {
        this.action = "show logo";
      }

    } else if (this.action === "show logo") {

      this.centerLogo = document.createElement('object');
      this.centerLogo.type = 'image/svg+xml';
      this.centerLogo.data = 'src/images/logo2.svg';
      this.centerLogo.id = 'centerLogo';
      document.body.appendChild(this.centerLogo);
      this.count = 0;
      this.action = "show logo wait";

    } else if (this.action === "show logo wait") {

      this.count += this.e.dt;
      if (this.count > 4) {
        gsap.to(this.centerLogo, { duration: 1, opacity: 0, ease: "linear" });
        this.count = 0;
        this.action = "hide logo wait";

      }

    } else if (this.action === "hide logo wait") {

      this.count += this.e.dt;
      if (this.count > 1) {
        this.count = 0;
        this.action = "show bar";
      }

    } else if (this.action === "show bar") {

      document.getElementById("topBar").style.height = "0px";
      gsap.to(document.getElementById("topBar"), { duration: .75, height: "50px", ease: "quint.inOut" });
      this.action = "show bar wait";

    } else if (this.action === "show bar wait") {

      this.count += this.e.dt;
      if (this.count > .75) {
        this.count = 0;
        this.action = "show buttons";
      }

    } else if (this.action === "show buttons") {

      document.getElementById("topBarGrad").style.opacity = "0";
      gsap.to(document.getElementById("topBarGrad"), { duration: .25, opacity: 1, ease: "linear" });
      gsap.to(document.getElementById("logo"), { duration: .25, opacity: 1, ease: "linear" });

      if(this.e.mobile===true){
        this.hamburger.style.display = "block";
        this.hamburger.style.pointerEvents = "auto";
        gsap.to(this.hamburger, { duration: .25, opacity: 1, ease: "linear" });
      }
  
      this.linkButtons = Array.from(document.querySelectorAll('.linkButton'));
      this.linkButtons.push(document.getElementById("tr1"));
      this.linkButtons.push(document.getElementById("tr2"));
      this.linkButtons.push(document.getElementById("tr3"));
      this.linkButtons.push(document.getElementById("tr4"));
      this.linkButtons.push(document.getElementById("tr5"));

      for (var i = 0; i < this.linkButtons.length; i++) {
        gsap.to(this.linkButtons[i], { duration: 0, opacity: 0 });
        gsap.to(this.linkButtons[i], { duration: 0.5, opacity: 1, delay: i * 0.05, ease: "sine.out" });
      }

      gsap.to(document.getElementById("bgCont"), { duration: 1, delay: 1.5, opacity: 1 });
      document.getElementById("mainDivCont").style.opacity = 0;
      gsap.to(document.getElementById("mainDivCont"), { duration: 1, delay: 2, opacity: 1 });

      this.toSection = "reel";
      this.action = "fade"

    } else if (this.action === "fade") {

      gsap.killTweensOf(this.mainDiv);
      gsap.to(this.mainDiv, { duration: .25, opacity: 0, ease: "linear" });
      this.action = "fade wait"

    } else if (this.action === "fade wait") {

      this.count += this.e.dt;
      if (this.count > .25) {
        this.count = 0;
        this.action = "load page";
      }

    } else if (this.action === "load page") {

      window.scrollTo({ top: 0 });
      this.myScroll = 0;
      console.log(this.toSection);
      this.setPage(this.toSection);
      gsap.killTweensOf(this.mainDiv);
      gsap.to(this.mainDiv, { duration: .5, opacity: 1, delay: .5, ease: "linear" });
      this.count = 0;
      this.action = "wait";
      
    }

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
        // Keep YouTube iframes opaque once shown — fading out leaves opacity 0 on the
        // player so clicks miss or the embed stops reliably receiving input.
        if (item.classList && item.classList.contains('videoContainer')) {
          continue;
        }
        gsap.killTweensOf(item);
        gsap.to(item, { duration: .5, delay: .12, opacity: 0, ease: "sine.out" });
        item.showing = false;
      }
    }
  }

  setPage(page) {
    this.closeGameSystemsVideo();
    const html = PAGE_HTML[page];
    if (typeof html !== 'string') {
      console.error('Unknown section page:', page);
      return;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const content = doc.querySelector('#container');
    if (!content) {
      console.error('No #container in section HTML:', page);
      return;
    }
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
    this.setUpGameSystemsVideo();
  }

  setUpGameSystemsVideo() {
    const playButton = document.getElementById('gameSystemsPlayButton');
    if (!playButton || playButton.dataset.bound === 'true') {
      return;
    }

    let overlay = document.getElementById('gameSystemsVideoOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'gameSystemsVideoOverlay';
      overlay.className = 'gameSystemsVideoOverlay';

      const video = document.createElement('video');
      video.id = 'gameSystemsVideoPlayer';
      video.className = 'gameSystemsVideoPlayer';
      video.src = 'src/videos/GameSuite5.mp4';
      video.setAttribute('playsinline', 'true');
      video.setAttribute('controls', 'true');
      video.preload = 'metadata';

      overlay.appendChild(video);
      document.body.appendChild(overlay);

      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
          this.closeGameSystemsVideo();
        }
      });
    }

    playButton.dataset.bound = 'true';
    playButton.addEventListener('click', (event) => {
      event.preventDefault();
      const video = document.getElementById('gameSystemsVideoPlayer');
      if (!video) return;

      overlay.classList.add('is-open');
      gsap.killTweensOf(overlay);
      gsap.to(overlay, { duration: 0.3, opacity: 1, ease: 'linear' });
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    });
  }

  closeGameSystemsVideo() {
    const overlay = document.getElementById('gameSystemsVideoOverlay');
    const video = document.getElementById('gameSystemsVideoPlayer');
    if (!overlay || !video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      duration: 0.2,
      opacity: 0,
      ease: 'linear',
      onComplete: () => {
        overlay.classList.remove('is-open');
      }
    });
  }

  mixer() {}
}
