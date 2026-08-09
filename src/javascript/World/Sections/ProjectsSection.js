import gsap from "gsap";
import * as THREE from "three";
import Project from "./Project";

export default class ProjectsSection {
  constructor(_options) {
    // Options
    this.time = _options.time;
    this.resources = _options.resources;
    this.camera = _options.camera;
    this.passes = _options.passes;
    this.objects = _options.objects;
    this.areas = _options.areas;
    this.zones = _options.zones;
    this.tiles = _options.tiles;
    this.debug = _options.debug;
    this.x = _options.x;
    this.y = _options.y;

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder("projects");
      this.debugFolder.open();
    }

    // Set up
    this.items = [];

    this.interDistance = 24;
    this.positionRandomess = 5;
    this.projectHalfWidth = 9;

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;
    this.container.updateMatrix();

    this.setGeometries();
    this.setMeshes();
    this.setList();
    this.setZone();

    // Add all project from the list
    for (const _options of this.list) {
      this.add(_options);
    }
  }

  setGeometries() {
    this.geometries = {};
    this.geometries.floor = new THREE.PlaneGeometry(16, 8);
  }

  setMeshes() {
    this.meshes = {};

    // this.meshes.boardStructure = this.objects.getConvertedMesh(this.resources.items.projectsBoardStructure.scene.children, { floorShadowTexture: this.resources.items.projectsBoardStructureFloorShadowTexture })
    this.resources.items.areaOpenTexture.magFilter = THREE.NearestFilter;
    this.resources.items.areaOpenTexture.minFilter = THREE.LinearFilter;
    this.meshes.boardPlane =
      this.resources.items.projectsBoardPlane.scene.children[0];
    this.meshes.areaLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 0.5),
      new THREE.MeshBasicMaterial({
        transparent: true,
        depthWrite: false,
        color: 0xffffff,
        alphaMap: this.resources.items.areaOpenTexture,
      }),
    );
    this.meshes.areaLabel.matrixAutoUpdate = false;
  }

  setList() {
    this.list = [
      {
        name: "Interactive Portfolio",
        imageSources: [
          "/models/projects/interactivePortfolio/slideA.png",
          "/models/projects/interactivePortfolio/slideB.png",
          "/models/projects/interactivePortfolio/slideC.png",
          "/models/projects/interactivePortfolio/slideD.png",
        ],
        imageFit: "contain",
        floorContent: {
          title: "Interactive Portfolio",
          description:
            "An immersive 3D interactive portfolio designed to showcase my projects, skills, activities, and experiences through an engaging game-like environment. It combines interactive 3D elements, responsive design, animations, and a dedicated Resume Mode to create a unique way of presenting my work and technical abilities.",
          role: "Caleb Adriel Tingson — Developer",
        },
        link: {
          href: "https://cerebuu.github.io/",
          x: -4.8,
          y: -3,
          halfExtents: {
            x: 3.2,
            y: 1.5,
          },
        },
        distinctions: [],
      },
      {
        name: "GDG on Campus UIC — Quality Assurance",
        imageSources: [
          "/models/projects/gdgQa/slideA.png",
          "/models/projects/gdgQa/slideB.png",
          "/models/projects/gdgQa/slideC.png",
          "/models/projects/gdgQa/slideD.png",
        ],
        imageFit: "contain",
        floorContent: {
          title: "GDG on Campus UIC — Quality Assurance",
          description:
            "Performed QA testing for the GDG on Campus UIC system by checking its features, functionality, UI, and user interactions. Identified, documented, and reported bugs to help ensure the system works as intended.",
          role: "Quality Assurance — Caleb Adriel Tingson",
          developer: "Lemuel Abellana",
        },
        link: {
          href: "https://guilds.uic.edu.ph/",
          x: -4.8,
          y: -3.3,
          halfExtents: {
            x: 3.2,
            y: 1.5,
          },
        },
        distinctions: [],
      },
      {
        name: "Student Organization System",
        imageSources: [
          "/models/projects/studentOrganizationSystem/slideA.png",
          "/models/projects/studentOrganizationSystem/slideB.png",
          "/models/projects/studentOrganizationSystem/slideC.png",
          "/models/projects/studentOrganizationSystem/slideD.png",
        ],
        imageFit: "contain",
        floorContent: {
          title: "Student Organization System",
          description:
            "A student organization management system designed to organize and streamline club-related information, announcements, activities, and student organization management in one centralized platform.",
          role: "Developer",
          developerLabel: "Developers",
          developer:
            "Caleb Adriel Tingson\nSzianzey Asesor\nBruce Arevalo",
        },
        link: {
          href: "https://github.com/cerebuu/student-org-system",
          x: -4.8,
          y: -3.3,
          halfExtents: {
            x: 3.2,
            y: 1.5,
          },
        },
        distinctions: [],
      },
      // {
      //     name: 'Zenly',
      //     imageSources:
      //     [
      //         './models/projects/zenly/slideA.jpg',
      //         './models/projects/zenly/slideB.jpg',
      //         './models/projects/zenly/slideC.jpg'
      //     ],
      //     floorTexture: this.resources.items.projectsZenlyFloorTexture,
      //     link:
      //     {
      //         href: 'https://zen.ly',
      //         x: - 4.8,
      //         y: - 4.2,
      //         halfExtents:
      //         {
      //             x: 3.2,
      //             y: 1.5
      //         }
      //     },
      //     distinctions:
      //     [
      //         { type: 'awwwards', x: 3.95, y: 4.15 },
      //         { type: 'fwa', x: 5.6, y: 4.15 },
      //         { type: 'cssda', x: 7.2, y: 4.15 }
      //     ]
      // },
      // {
      //     name: 'gleecChat',
      //     imageSources:
      //     [
      //         './models/projects/gleecChat/slideA.jpg',
      //         './models/projects/gleecChat/slideB.jpg',
      //         './models/projects/gleecChat/slideC.jpg',
      //         './models/projects/gleecChat/slideD.jpg'
      //     ],
      //     floorTexture: this.resources.items.projectsGleecChatFloorTexture,
      //     link:
      //     {
      //         href: 'http://gleec.imm-g-prod.com',
      //         x: - 4.8,
      //         y: - 3.4,
      //         halfExtents:
      //         {
      //             x: 3.2,
      //             y: 1.5
      //         }
      //     },
      //     distinctions:
      //     [
      //         { type: 'awwwards', x: 3.95, y: 4.15 },
      //         { type: 'fwa', x: 5.6, y: 4.15 },
      //         { type: 'cssda', x: 7.2, y: 4.15 }
      //     ]
      // },
      // {
      //     name: 'keppler',
      //     imageSources:
      //     [
      //         './models/projects/keppler/slideA.jpg',
      //         './models/projects/keppler/slideB.jpg',
      //         './models/projects/keppler/slideC.jpg'
      //     ],
      //     floorTexture: this.resources.items.projectsKepplerFloorTexture,
      //     link:
      //     {
      //         href: 'https://brunosimon.github.io/keppler/',
      //         x: 2.75,
      //         y: - 1.1,
      //         halfExtents:
      //         {
      //             x: 3.2,
      //             y: 1.5
      //         }
      //     },
      //     distinctions: []
      // }
    ];
  }

  setZone() {
    const totalWidth = this.list.length * (this.interDistance / 2);

    const zone = this.zones.add({
      position: {
        x: this.x + totalWidth - this.projectHalfWidth - 6,
        y: this.y,
      },
      halfExtents: { x: totalWidth, y: 12 },
      data: { cameraAngle: "projects" },
    });

    zone.on("in", (_data) => {
      this.camera.angle.set(_data.cameraAngle);
      gsap.to(
        this.passes.horizontalBlurPass.material.uniforms.uStrength.value,
        { x: 0, duration: 2 },
      );
      gsap.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, {
        y: 0,
        duration: 2,
      });
    });

    zone.on("out", () => {
      this.camera.angle.set("default");
      gsap.to(
        this.passes.horizontalBlurPass.material.uniforms.uStrength.value,
        { x: this.passes.horizontalBlurPass.strength, duration: 2 },
      );
      gsap.to(this.passes.verticalBlurPass.material.uniforms.uStrength.value, {
        y: this.passes.verticalBlurPass.strength,
        duration: 2,
      });
    });
  }

  add(_options) {
    const x = this.x + this.items.length * this.interDistance;
    let y = this.y;
    if (this.items.length > 0) {
      y += (Math.random() - 0.5) * this.positionRandomess;
    }

    // Create project
    const project = new Project({
      time: this.time,
      resources: this.resources,
      objects: this.objects,
      areas: this.areas,
      camera: this.camera,
      geometries: this.geometries,
      meshes: this.meshes,
      debug: this.debugFolder,
      x: x,
      y: y,
      ..._options,
    });

    this.container.add(project.container);

    // Add tiles
    if (this.items.length >= 1) {
      const previousProject = this.items[this.items.length - 1];
      const start = new THREE.Vector2(
        previousProject.x + this.projectHalfWidth,
        previousProject.y,
      );
      const end = new THREE.Vector2(
        project.x - this.projectHalfWidth,
        project.y,
      );
      const delta = end.clone().sub(start);
      this.tiles.add({
        start: start,
        delta: delta,
      });
    }

    // Save
    this.items.push(project);
  }
}
