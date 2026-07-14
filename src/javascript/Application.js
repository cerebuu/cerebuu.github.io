import * as dat from "dat.gui";
import * as THREE from "three";

import Camera from "./Camera.js";
import Resources from "./Resources.js";
import ThreejsJourney from "./ThreejsJourney.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import World from "./World/index.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import BlurPass from "./Passes/Blur.js";
import GlowsPass from "./Passes/Glows.js";

export default class Application {
  /**
   * Constructor
   */
  constructor(_options) {
    // Options
    this.$canvas = _options.$canvas;

    // Set up
    this.time = new Time();
    this.sizes = new Sizes();
    this.resources = new Resources();

    this.setConfig();
    this.setDebug();
    this.setRenderer();
    this.setCamera();
    this.setPasses();
    this.setWorld();
    this.setSnow();
    this.setTitle();
    this.setThreejsJourney();
  }

  /**
   * Set config
   */
  setConfig() {
    this.config = {};
    this.config.debug = window.location.hash === "#debug";
    this.config.cyberTruck = window.location.hash === "#cybertruck";
    this.config.touch = false;

    window.addEventListener(
      "touchstart",
      () => {
        this.config.touch = true;
        this.world.controls.setTouch();

        this.passes.horizontalBlurPass.strength = 1;
        this.passes.horizontalBlurPass.material.uniforms.uStrength.value =
          new THREE.Vector2(this.passes.horizontalBlurPass.strength, 0);
        this.passes.verticalBlurPass.strength = 1;
        this.passes.verticalBlurPass.material.uniforms.uStrength.value =
          new THREE.Vector2(0, this.passes.verticalBlurPass.strength);
      },
      { once: true },
    );
  }

  /**
   * Set debug
   */
  setDebug() {
    if (this.config.debug) {
      this.debug = new dat.GUI({ width: 420 });
    }
  }

  /**
   * Set renderer
   */
  setRenderer() {
    // Scene
    this.scene = new THREE.Scene();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$canvas,
      alpha: true,
      powerPreference: "high-performance",
    });
    // this.renderer.setClearColor(0x414141, 1)
    this.renderer.setClearColor(0x000000, 1);
    // this.renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1.5), 2))
    this.renderer.setPixelRatio(2);
    this.renderer.setSize(
      this.sizes.viewport.width,
      this.sizes.viewport.height,
    );
    this.renderer.autoClear = false;

    // Resize event
    this.sizes.on("resize", () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height,
      );
    });
  }

  /**
   * Set camera
   */
  setCamera() {
    this.camera = new Camera({
      time: this.time,
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
      config: this.config,
    });

    this.scene.add(this.camera.container);

    this.time.on("tick", () => {
      if (this.world && this.world.car) {
        this.camera.target.x = this.world.car.chassis.object.position.x;
        this.camera.target.y = this.world.car.chassis.object.position.y;
      }
    });
  }

  setPasses() {
    this.passes = {};

    // Debug
    if (this.debug) {
      this.passes.debugFolder = this.debug.addFolder("postprocess");
      // this.passes.debugFolder.open()
    }

    this.passes.composer = new EffectComposer(this.renderer);

    // Create passes
    this.passes.renderPass = new RenderPass(this.scene, this.camera.instance);

    this.passes.horizontalBlurPass = new ShaderPass(BlurPass);
    this.passes.horizontalBlurPass.strength = this.config.touch ? 0 : 1;
    this.passes.horizontalBlurPass.material.uniforms.uResolution.value =
      new THREE.Vector2(this.sizes.viewport.width, this.sizes.viewport.height);
    this.passes.horizontalBlurPass.material.uniforms.uStrength.value =
      new THREE.Vector2(this.passes.horizontalBlurPass.strength, 0);

    this.passes.verticalBlurPass = new ShaderPass(BlurPass);
    this.passes.verticalBlurPass.strength = this.config.touch ? 0 : 1;
    this.passes.verticalBlurPass.material.uniforms.uResolution.value =
      new THREE.Vector2(this.sizes.viewport.width, this.sizes.viewport.height);
    this.passes.verticalBlurPass.material.uniforms.uStrength.value =
      new THREE.Vector2(0, this.passes.verticalBlurPass.strength);

    // Debug
    if (this.debug) {
      const folder = this.passes.debugFolder.addFolder("blur");
      folder.open();

      folder
        .add(
          this.passes.horizontalBlurPass.material.uniforms.uStrength.value,
          "x",
        )
        .step(0.001)
        .min(0)
        .max(10);
      folder
        .add(
          this.passes.verticalBlurPass.material.uniforms.uStrength.value,
          "y",
        )
        .step(0.001)
        .min(0)
        .max(10);
    }

    this.passes.glowsPass = new ShaderPass(GlowsPass);
    this.passes.glowsPass.color = "#ffffff";
    this.passes.glowsPass.material.uniforms.uPosition.value = new THREE.Vector2(
      0,
      0.25,
    );
    this.passes.glowsPass.material.uniforms.uRadius.value = 0.7;
    this.passes.glowsPass.material.uniforms.uColor.value = new THREE.Color(
      this.passes.glowsPass.color,
    );
    this.passes.glowsPass.material.uniforms.uColor.value.convertLinearToSRGB();
    this.passes.glowsPass.material.uniforms.uAlpha.value = 0.55;

    // Debug
    if (this.debug) {
      const folder = this.passes.debugFolder.addFolder("glows");
      folder.open();

      folder
        .add(this.passes.glowsPass.material.uniforms.uPosition.value, "x")
        .step(0.001)
        .min(-1)
        .max(2)
        .name("positionX");
      folder
        .add(this.passes.glowsPass.material.uniforms.uPosition.value, "y")
        .step(0.001)
        .min(-1)
        .max(2)
        .name("positionY");
      folder
        .add(this.passes.glowsPass.material.uniforms.uRadius, "value")
        .step(0.001)
        .min(0)
        .max(2)
        .name("radius");
      folder
        .addColor(this.passes.glowsPass, "color")
        .name("color")
        .onChange(() => {
          this.passes.glowsPass.material.uniforms.uColor.value =
            new THREE.Color(this.passes.glowsPass.color);
        });
      folder
        .add(this.passes.glowsPass.material.uniforms.uAlpha, "value")
        .step(0.001)
        .min(0)
        .max(1)
        .name("alpha");
    }

    // Add passes
    this.passes.composer.addPass(this.passes.renderPass);
    this.passes.composer.addPass(this.passes.horizontalBlurPass);
    this.passes.composer.addPass(this.passes.verticalBlurPass);
    this.passes.composer.addPass(this.passes.glowsPass);

    // Time tick
    this.time.on("tick", () => {
      this.passes.horizontalBlurPass.enabled =
        this.passes.horizontalBlurPass.material.uniforms.uStrength.value.x > 0;
      this.passes.verticalBlurPass.enabled =
        this.passes.verticalBlurPass.material.uniforms.uStrength.value.y > 0;

      // Renderer
      this.passes.composer.render();
      // this.renderer.domElement.style.background = 'black'
      // this.renderer.render(this.scene, this.camera.instance)
    });

    // Resize event
    this.sizes.on("resize", () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height,
      );
      this.passes.composer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height,
      );
      this.passes.horizontalBlurPass.material.uniforms.uResolution.value.x =
        this.sizes.viewport.width;
      this.passes.horizontalBlurPass.material.uniforms.uResolution.value.y =
        this.sizes.viewport.height;
      this.passes.verticalBlurPass.material.uniforms.uResolution.value.x =
        this.sizes.viewport.width;
      this.passes.verticalBlurPass.material.uniforms.uResolution.value.y =
        this.sizes.viewport.height;
    });
  }

  /**
   * Set world
   */
  setWorld() {
    this.world = new World({
      config: this.config,
      debug: this.debug,
      resources: this.resources,
      time: this.time,
      sizes: this.sizes,
      camera: this.camera,
      scene: this.scene,
      renderer: this.renderer,
      passes: this.passes,
    });
    this.scene.add(this.world.container);
  }

  /**
   * Set snow
   * Adds a falling snow particle system. The world here uses X/Y as the
   * ground plane and Z as height (see how camera.target reads car.position.x/.y
   * above), so snow falls along -Z and the whole field re-centers on the
   * camera target each frame so it always surrounds the car.
   *
   * Tweak these if the flakes look too sparse/dense/big for your world scale:
   *   this.snow.count  -> number of flakes
   *   this.snow.area   -> how wide the snowfall spreads on X/Y
   *   this.snow.height -> how tall the snowfall column is on Z
   *   this.snow.material.size -> size of each flake
   */
  setSnow() {
    this.snow = {};
    this.snow.count = 1500;
    this.snow.area = 60;
    this.snow.height = 40;

    // Geometry
    this.snow.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(this.snow.count * 3);
    const speeds = new Float32Array(this.snow.count);

    for (let i = 0; i < this.snow.count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * this.snow.area; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * this.snow.area; // y
      positions[i * 3 + 2] = Math.random() * this.snow.height; // z (height, falls toward 0)

      speeds[i] = 0.4 + Math.random() * 1.2;
    }

    this.snow.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    this.snow.speeds = speeds;

    // Soft round flake texture, generated on a canvas (no image asset needed)
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);

    this.snow.texture = new THREE.CanvasTexture(canvas);

    // Material
    this.snow.material = new THREE.PointsMaterial({
      size: 0.35,
      map: this.snow.texture,
      transparent: true,
      depthWrite: false,
      opacity: 0.9,
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
    });

    // Points
    this.snow.points = new THREE.Points(this.snow.geometry, this.snow.material);
    this.snow.points.frustumCulled = false;
    this.scene.add(this.snow.points);

    // Debug
    if (this.debug) {
      const folder = this.debug.addFolder("snow");
      folder.open();

      folder.add(this.snow.material, "size").step(0.01).min(0.05).max(2);
      folder.add(this.snow.material, "opacity").step(0.01).min(0).max(1);
    }

    // Animate
    this.time.on("tick", () => {
      // Keep the snowfall centered on whatever the camera is following
      if (this.camera && this.camera.target) {
        this.snow.points.position.x = this.camera.target.x;
        this.snow.points.position.y = this.camera.target.y;
      }

      const positionAttribute = this.snow.geometry.attributes.position;
      const elapsedSeconds = this.time.elapsed ? this.time.elapsed * 0.001 : 0;

      for (let i = 0; i < this.snow.count; i++) {
        let z = positionAttribute.getZ(i);
        z -= this.snow.speeds[i] * 0.05;

        if (z < 0) {
          z = this.snow.height;
        }

        positionAttribute.setZ(i, z);

        // Gentle side-to-side drift so it doesn't fall perfectly straight
        const drift = Math.sin(elapsedSeconds * 0.3 + i) * 0.02;
        positionAttribute.setX(i, positionAttribute.getX(i) + drift);
      }

      positionAttribute.needsUpdate = true;
    });
  }

  /**
   * Set title
   */
  setTitle() {
    this.title = {};
    this.title.frequency = 300;
    this.title.width = 20;
    this.title.position = 0;
    this.title.$element = document.querySelector("title");
    this.title.absolutePosition = Math.round(this.title.width * 0.25);

    this.time.on("tick", () => {
      if (this.world.physics) {
        this.title.absolutePosition += this.world.physics.car.forwardSpeed;

        if (this.title.absolutePosition < 0) {
          this.title.absolutePosition = 0;
        }
      }
    });

    window.setInterval(() => {
      this.title.position = Math.round(
        this.title.absolutePosition % this.title.width,
      );

      document.title = `${"_".repeat(this.title.width - this.title.position)}🚗${"_".repeat(this.title.position)}`;
    }, this.title.frequency);
  }

  /**
   * Set Three.js Journey
   */
  setThreejsJourney() {
    this.threejsJourney = new ThreejsJourney({
      config: this.config,
      time: this.time,
      world: this.world,
    });
  }

  /**
   * Destructor
   */
  destructor() {
    this.time.off("tick");
    this.sizes.off("resize");

    this.camera.orbitControls.dispose();
    this.renderer.dispose();
    this.debug.destroy();
  }
}
