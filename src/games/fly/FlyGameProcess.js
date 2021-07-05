

import "@babylonjs/loaders/glTF";

import { ViewerProcess } from 'ddd-viewer';
import { SceneLoader, Vector3 } from '@babylonjs/core';


class FlyGameProcess extends ViewerProcess {

    initialized = false;

    constructor(sceneViewer, gameData) {

        super(sceneViewer);

        // These attributes are set by the SceneViewer/ViewerProcesses externally
        this.processes = null;
        this.finished = false;

        this.time = 0.0;

        this.gameLabel = "Vuelo Principante";

        this.seagull = null;

        // JSON encoded game data
        this.gameData = gameData;

        this.controlsLeft = false;
        this.controlsRight = false;
        this.controlsUp = false;
        this.controlsDown = false;

        this.rotationSpeed = 2 * Math.PI * 0.5;

        this.seagull = null;
        this.heading = 0;
        this.velocity = new Vector3();

        /*
        this.dtStart = dtStart;
        this.dtEnd = dtEnd;
        this.animTime = animTime;
        //console.debug("Datetime anim from " + dtStart + " to " + dtEnd);
        */
    }

    loadPlayerModel() {
        const filename = "/assets/seagull/gull-oriented.glb";
        //const filename = "/assets/parachute/scene.gltf";
        SceneLoader.ImportMesh(null, filename, '', this.sceneViewer.scene, //this.scene,
        // onSuccess
        (newMeshes, particleSystems, skeletons) => {
            newMeshes[0].setParent(null);
            newMeshes[0].setEnabled(true);
            newMeshes[0].position = new Vector3(0, 200, 0);
            this.seagull = newMeshes[0];

            newMeshes[0].scaling = new Vector3(0.75, 0.75, -0.75);

            //console.debug("Loading player model.", this.sceneViewer.scene, newMeshes[0]);
            newMeshes.forEach((_mesh, _i) => {
                if (this.sceneViewer.shadowGenerator) {
                    //this.sceneViewer.shadowGenerator.getShadowMap().renderList.push(mesh);
                }
              });
          },
          (_event) => {
          },
          (_scene, _msg, ex) => {
              console.log("Could not load model: " + filename, ex);
          }
       );
    }

    initialize() {

        console.info("Initializing FlyGameProcess.");

        // Load seagull model
        this.loadPlayerModel();
        //this.sceneViewer.loadPlayerModel();

        // Set player initial position
        //@42.2309465,-8.7266273,34a,35y,24.5h,70.25t
        this.sceneViewer.camera.detachControl();
        this.sceneViewer.viewerState.sceneViewModeShow = false;

        window.addEventListener('keydown', (e) => { if (String.fromCharCode(e.which) === 'A') { this.controlsLeft = true; } });
        window.addEventListener('keyup', (e) => { if (String.fromCharCode(e.which) === 'A') { this.controlsLeft = false; } });
        window.addEventListener('keydown', (e) => { if (String.fromCharCode(e.which) === 'D') { this.controlsRight = true; } });
        window.addEventListener('keyup', (e) => { if (String.fromCharCode(e.which) === 'D') { this.controlsRight = false; } });
        window.addEventListener('keydown', (e) => { if (String.fromCharCode(e.which) === 'W') { this.controlsUp = true; } });
        window.addEventListener('keyup', (e) => { if (String.fromCharCode(e.which) === 'W') { this.controlsUp = false; } });
        window.addEventListener('keydown', (e) => { if (String.fromCharCode(e.which) === 'S') { this.controlsDown = true; } });
        window.addEventListener('keyup', (e) => { if (String.fromCharCode(e.which) === 'S') { this.controlsDown = false; } });

    }

    update(deltaTime) {

        // TODO: Hacky way of initializing the process:
        // This should be called by ViewerProcesses for each new process.
        if (this.time > 1.0 && !this.initialized) {
            this.initialized = true;
            this.initialize();
        }
        this.time += deltaTime;

        //this.seagull = this.sceneViewer.seagull;
        // Check needed objects are loaded
        if (this.seagull === null) { return; }

        // Process input
        let pitch = 0.0;
        if (this.controlsLeft) { this.heading -= this.rotationSpeed * deltaTime; }
        if (this.controlsRight) { this.heading += this.rotationSpeed * deltaTime; }
        if (this.controlsUp) { pitch = -0.3; }
        if (this.controlsDown) { pitch = 0.1; }

        // Apply physics
        let inclination = (this.controlsLeft ? -0.2 : (this.controlsRight ? 0.2 : 0.0));
        this.seagull.rotation = new Vector3(pitch, this.heading, inclination);

        let velocityRef = new Vector3(0, -2.0, -7.5);
        let headingRotation = new Vector3(0, this.heading, 0).toQuaternion();
        let velocity = velocityRef.rotateByQuaternionToRef(headingRotation, new Vector3());

        const movement = velocity.scale(deltaTime);


        let newPos = this.seagull.position.clone();
        newPos.addInPlace(movement);
        this.seagull.position = newPos;

        // Update camera to follow target from behind
        let cameraTargetPos = new Vector3(0, 1, -2);
        let cameraTargetPosWorld = Vector3.TransformCoordinates(cameraTargetPos, this.seagull.getWorldMatrix());

        let cameraNewPos = Vector3.Lerp(this.sceneViewer.camera.position, cameraTargetPosWorld, 0.02);

        this.sceneViewer.camera.position = cameraNewPos;
        //sceneViewer.camera.lookAt(this.seagull.position);
        //new BABYLON.Vector3((90.0 - sceneViewer.viewerState.positionTilt) * (Math.PI / 180.0), sceneViewer.viewerState.positionHeading * (Math.PI / 180.0), 0.0);
        this.sceneViewer.camera.setTarget(this.seagull.position);



        /*
        let interp_factor = (this.animTime > 0) ? ((this.time) / this.animTime) : 1.0;
        if (interp_factor > 1.0) {
            interp_factor = 1.0;
        }

        let interpTime = (this.dtEnd / 1000 - this.dtStart / 1000) * interp_factor;

        sceneViewer.viewerState.positionDate = new Date(this.dtStart.getTime() + interpTime * 1000);
        sceneViewer.lightSetupFromDatePos();

        if (interp_factor >= 1.0) {
            this.processes.remove(this);
        }
        */
    }

}

export { FlyGameProcess };
