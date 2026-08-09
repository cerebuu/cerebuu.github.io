import * as THREE from "three";

import gsap from "gsap";
import ProjectBoardMaterial from "../../Materials/ProjectBoard.js";

export default class Project {
  constructor(_options) {
    // Options
    this.time = _options.time;
    this.resources = _options.resources;
    this.objects = _options.objects;
    this.areas = _options.areas;
    this.name = _options.name;
    this.geometries = _options.geometries;
    this.meshes = _options.meshes;
    this.camera = _options.camera;
    this.debug = _options.debug;
    this.name = _options.name;
    this.x = _options.x;
    this.y = _options.y;
    this.imageSources = _options.imageSources;
    this.imageFit = _options.imageFit || "stretch";
    this.floorTexture = _options.floorTexture;
    this.floorContent = _options.floorContent;
    this.link = _options.link;
    this.distinctions = _options.distinctions;

    // Set up
    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;
    // this.container.updateMatrix()

    this.setBoards();
    this.setFloor();
  }

  setBoards() {
    // Set up
    this.boards = {};
    this.boards.items = [];
    this.boards.xStart = -5;
    this.boards.xInter = 5;
    this.boards.y = 5;
    this.boards.color = "#8e7161";
    this.boards.threeColor = new THREE.Color(this.boards.color);

    if (this.debug) {
      this.debug
        .addColor(this.boards, "color")
        .name("boardColor")
        .onChange(() => {
          this.boards.threeColor.set(this.boards.color);
        });
    }

    // Create each board
    let i = 0;

    for (const _imageSource of this.imageSources) {
      // Set up
      const board = {};
      board.x = this.x + this.boards.xStart + i * this.boards.xInter;
      board.y = this.y + this.boards.y;

      // Create structure with collision
      this.objects.add({
        base: this.resources.items.projectsBoardStructure.scene,
        collision: this.resources.items.projectsBoardCollision.scene,
        floorShadowTexture:
          this.resources.items.projectsBoardStructureFloorShadowTexture,
        offset: new THREE.Vector3(board.x, board.y, 0),
        rotation: new THREE.Euler(0, 0, 0),
        duplicated: true,
        mass: 0,
      });

      // Image load
      const image = new Image();
      image.addEventListener("load", () => {
        board.texture = new THREE.Texture(image);
        // board.texture.magFilter = THREE.NearestFilter
        // board.texture.minFilter = THREE.LinearFilter
        board.texture.anisotropy = 4;
        // board.texture.colorSpace = THREE.SRGBColorSpace
        board.texture.needsUpdate = true;

        board.planeMesh.material.uniforms.uTexture.value = board.texture;
        if (this.imageFit === "contain") {
          this.setImageContainScale(board, image);
        } else {
          board.planeMesh.material.uniforms.uImageScale.value.set(1, 1);
        }

        gsap.to(board.planeMesh.material.uniforms.uTextureAlpha, {
          value: 1,
          duration: 1,
          ease: "power4.inOut",
        });
      });

      image.addEventListener("error", () => {
        board.texture = this.createImageFallbackTexture();
        board.texture.needsUpdate = true;
        board.planeMesh.material.uniforms.uTexture.value = board.texture;
        board.planeMesh.material.uniforms.uImageScale.value.set(1, 1);

        gsap.to(board.planeMesh.material.uniforms.uTextureAlpha, {
          value: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      image.src = _imageSource;

      // Plane
      board.planeMesh = this.meshes.boardPlane.clone();
      board.planeMesh.position.x = board.x;
      board.planeMesh.position.y = board.y;
      board.planeMesh.matrixAutoUpdate = false;
      board.planeMesh.updateMatrix();
      board.planeMesh.material = new ProjectBoardMaterial();
      board.planeMesh.material.uniforms.uColor.value = this.boards.threeColor;
      board.planeMesh.material.uniforms.uTextureAlpha.value = 0;
      this.container.add(board.planeMesh);

      board.area = this.areas.add({
        position: new THREE.Vector2(board.x, board.y),
        halfExtents: new THREE.Vector2(2.7, 1.35),
        hasKey: false,
        testCar: false,
        active: true,
      });
      board.area.on("interact", () => {
        if (this.camera) {
          this.camera.angle.set("inspect");
        }

        if (this.link && this.link.href) {
          window.open(this.link.href, "_blank");
        }
      });

      // Save
      this.boards.items.push(board);

      i++;
    }
  }

  setImageContainScale(board, image) {
    board.planeMesh.geometry.computeBoundingBox();
    const frameSize = new THREE.Vector3();
    board.planeMesh.geometry.boundingBox.getSize(frameSize);
    const visibleDimensions = [frameSize.x, frameSize.y, frameSize.z]
      .filter((dimension) => dimension > Number.EPSILON)
      .sort((a, b) => b - a);
    const frameAspect = visibleDimensions[0] / visibleDimensions[1];
    const imageAspect = image.naturalWidth / image.naturalHeight;
    const scale = board.planeMesh.material.uniforms.uImageScale.value;

    if (imageAspect > frameAspect) {
      scale.set(1, frameAspect / imageAspect);
    } else {
      scale.set(imageAspect / frameAspect, 1);
    }
  }

  createImageFallbackTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 900;
    const context = canvas.getContext("2d");

    context.fillStyle = "#2b211e";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#8e7161";
    context.lineWidth = 12;
    context.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = '700 52px "Anton", Impact, sans-serif';
    context.fillText("IMAGE UNAVAILABLE", canvas.width / 2, canvas.height / 2);

    return new THREE.CanvasTexture(canvas);
  }

  setFloor() {
    this.floor = {};

    this.floor.x = 0;
    this.floor.y = -2;

    // Container
    this.floor.container = new THREE.Object3D();
    this.floor.container.position.x = this.x + this.floor.x;
    this.floor.container.position.y = this.y + this.floor.y;
    this.floor.container.matrixAutoUpdate = false;
    this.floor.container.updateMatrix();
    this.container.add(this.floor.container);

    // Texture
    this.floor.texture = this.floorContent
      ? this.createFloorTexture(this.floorContent)
      : this.floorTexture;
    this.floor.texture.magFilter = THREE.NearestFilter;
    this.floor.texture.minFilter = THREE.LinearFilter;

    // Geometry
    this.floor.geometry = this.geometries.floor;

    // Material
    this.floor.material = new THREE.MeshBasicMaterial({
      transparent: true,
      depthWrite: false,
      alphaMap: this.floor.texture,
    });

    // Mesh
    this.floor.mesh = new THREE.Mesh(this.floor.geometry, this.floor.material);
    this.floor.mesh.matrixAutoUpdate = false;
    this.floor.container.add(this.floor.mesh);

    // Distinctions
    if (this.distinctions) {
      for (const _distinction of this.distinctions) {
        let base = null;
        let collision = null;
        let shadowSizeX = null;
        let shadowSizeY = null;

        switch (_distinction.type) {
          case "awwwards":
            base = this.resources.items.projectsDistinctionsAwwwardsBase.scene;
            collision =
              this.resources.items.projectsDistinctionsAwwwardsCollision.scene;
            shadowSizeX = 1.5;
            shadowSizeY = 1.5;
            break;

          case "fwa":
            base = this.resources.items.projectsDistinctionsFWABase.scene;
            collision =
              this.resources.items.projectsDistinctionsFWACollision.scene;
            shadowSizeX = 2;
            shadowSizeY = 1;
            break;

          case "cssda":
            base = this.resources.items.projectsDistinctionsCSSDABase.scene;
            collision =
              this.resources.items.projectsDistinctionsCSSDACollision.scene;
            shadowSizeX = 1.2;
            shadowSizeY = 1.2;
            break;
        }

        this.objects.add({
          base: base,
          collision: collision,
          offset: new THREE.Vector3(
            this.x + this.floor.x + _distinction.x,
            this.y + this.floor.y + _distinction.y,
            0,
          ),
          rotation: new THREE.Euler(0, 0, 0),
          duplicated: true,
          shadow: {
            sizeX: shadowSizeX,
            sizeY: shadowSizeY,
            offsetZ: -0.1,
            alpha: 0.5,
          },
          mass: 1.5,
          soundName: "woodHit",
        });
      }
    }

    // Area
    this.floor.area = this.areas.add({
      position: new THREE.Vector2(
        this.x + this.link.x,
        this.y + this.floor.y + this.link.y,
      ),
      halfExtents: new THREE.Vector2(
        this.link.halfExtents.x,
        this.link.halfExtents.y,
      ),
    });
    this.floor.area.on("interact", () => {
      if (this.camera) {
        this.camera.angle.set("fpv");
      }

      window.open(this.link.href, "_blank");
    });

    // Area label
    this.floor.areaLabel = this.meshes.areaLabel.clone();
    this.floor.areaLabel.position.x = this.link.x;
    this.floor.areaLabel.position.y = this.link.y;
    this.floor.areaLabel.position.z = 0.001;
    this.floor.areaLabel.matrixAutoUpdate = false;
    this.floor.areaLabel.updateMatrix();
    this.floor.container.add(this.floor.areaLabel);
  }

  createFloorTexture(content) {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;

    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.textBaseline = "top";
    context.textAlign = "left";
    this.drawAntonText(context, content.title.toUpperCase(), 48, 36, 104);

    this.drawJustifiedText(context, content.description.toUpperCase(), 48, 184, 720, 36, 48);

    this.drawSectionLabel(context, "ROLE", 900, 184);
    this.drawWrappedText(context, content.role.toUpperCase(), 900, 246, 420, 38, 50);

    if (content.developer) {
      this.drawSectionLabel(context, content.developerLabel || "DEVELOPER", 900, 390);
      this.drawWrappedText(context, content.developer.toUpperCase(), 900, 452, 420, 38, 50);
    }

    return new THREE.CanvasTexture(canvas);
  }

  drawWrappedText(context, text, x, y, maxWidth, fontSize, lineHeight) {
    let lineY = y;

    for (const paragraph of text.split("\n")) {
      const words = paragraph.split(" ");
      let line = "";

      for (const word of words) {
        const nextLine = line ? `${line} ${word}` : word;

        if (line && this.measureRegularText(context, nextLine, fontSize) > maxWidth) {
          this.drawRegularText(context, line, x, lineY, fontSize);
          line = word;
          lineY += lineHeight;
        } else {
          line = nextLine;
        }
      }

      if (line) {
        this.drawRegularText(context, line, x, lineY, fontSize);
        lineY += lineHeight;
      }
    }
  }

  drawSectionLabel(context, label, x, y) {
    const paddingX = 10;
    const paddingY = 4;
    const labelSize = 40;
    const labelWidth = this.measureAntonText(label, labelSize);
    const height = 50;

    context.fillStyle = "#ffffff";
    context.fillRect(x, y, labelWidth + paddingX * 2, height);
    context.fillStyle = "#000000";
    this.drawAntonText(context, label, x + paddingX, y + paddingY, labelSize);
    context.fillStyle = "#ffffff";
  }

  drawJustifiedText(context, text, x, y, maxWidth, fontSize, lineHeight) {
    const lines = [];
    let words = [];

    for (const word of text.split(" ")) {
      const candidate = [...words, word].join(" ");

      if (words.length && this.measureRegularText(context, candidate, fontSize) > maxWidth) {
        lines.push(words);
        words = [word];
      } else {
        words.push(word);
      }
    }

    if (words.length) {
      lines.push(words);
    }

    lines.forEach((lineWords, index) => {
      const lineY = y + index * lineHeight;
      const isLastLine = index === lines.length - 1;

      if (isLastLine || lineWords.length === 1) {
        this.drawRegularText(context, lineWords.join(" "), x, lineY, fontSize);
        return;
      }

      const wordsWidth = lineWords.reduce(
        (total, word) => total + this.measureRegularText(context, word, fontSize),
        0,
      );
      const gap = (maxWidth - wordsWidth) / (lineWords.length - 1);
      let wordX = x;

      for (const word of lineWords) {
        this.drawRegularText(context, word, wordX, lineY, fontSize);
        wordX += this.measureRegularText(context, word, fontSize) + gap;
      }
    });
  }

  measureRegularText(context, text, size) {
    context.save();
    context.font = `400 ${size}px "Avenir Next Condensed", "Helvetica Neue", Arial, sans-serif`;
    const width = context.measureText(text).width * 0.84;
    context.restore();
    return width;
  }

  drawRegularText(context, text, x, y, size) {
    context.save();
    context.font = `400 ${size}px "Avenir Next Condensed", "Helvetica Neue", Arial, sans-serif`;
    context.translate(x, y);
    context.scale(0.84, 1);
    context.fillText(text, 0, 0);
    context.restore();
  }

  measureAntonText(text, size) {
    const font = this.resources.items.antonFont;

    if (!font) {
      return text.length * size * 0.5;
    }

    const scale = size / font.data.resolution;
    return [...text].reduce((width, character) => {
      const glyph = font.data.glyphs[character] || font.data.glyphs["?"];
      return width + glyph.ha * scale;
    }, 0);
  }

  drawAntonText(context, text, x, y, size) {
    const font = this.resources.items.antonFont;

    if (!font) {
      context.font = `400 ${size}px Impact, sans-serif`;
      context.fillText(text, x, y);
      return;
    }

    const shapes = font.generateShapes(text, size);
    const contours = [];
    let maxY = -Infinity;

    for (const shape of shapes) {
      const points = shape.getPoints(12);
      const holes = shape.holes.map((hole) => hole.getPoints(12));
      contours.push(points, ...holes);

      for (const point of [...points, ...holes.flat()]) {
        maxY = Math.max(maxY, point.y);
      }
    }

    if (!contours.length) {
      return;
    }

    context.save();
    context.translate(x, y + maxY);
    context.scale(1, -1);
    context.beginPath();

    for (const points of contours) {
      if (!points.length) {
        continue;
      }

      context.moveTo(points[0].x, points[0].y);
      for (const point of points.slice(1)) {
        context.lineTo(point.x, point.y);
      }
      context.closePath();
    }

    context.fill("evenodd");
    context.restore();
  }
}
