

import "@babylonjs/loaders/glTF";

import { ViewerProcess } from 'ddd-viewer';
import { Axis, SceneLoader, Space, Vector3 } from '@babylonjs/core';
import { GamepadManager } from "@babylonjs/core";
import { Scalar } from "@babylonjs/core";


class DroneGameProcess extends ViewerProcess {

    initialized = false;

    constructor(sceneViewer, gameData) {

        super(sceneViewer);

        // These attributes are set by the SceneViewer/ViewerProcesses externally
        this.processes = null;
        this.finished = false;

        this.time = 0.0;

        this.gameLabel = "Vuelo Principante";

        this.vehicle = null;

        // JSON encoded game data
        this.gameData = gameData;

        this.controlKeys = {
            'KeyW': false,
            'KeyA': false,
            'KeyS': false,
            'KeyD': false,
            'ArrowUp': false,
            'ArrowLeft': false,
            'ArrowDown': false,
            'ArrowRight': false,
        };
        this.joystickThrottle = 0.0;
        this.joystickRotation = 0.0;
        this.joystickForward = 0.0;
        this.joystickSide = 0.0;

        this.rotationSpeed = 0.0 * Math.PI;
        this.maxRotationSpeed = 1.0 * Math.PI;
        
        this.rollSpeed = 0.0;
        this.pitchSpeed = 0.0;
        this.maxRollSpeed = 2.0 * Math.PI;
        this.maxRollAngle = 0.20 * Math.PI;

        this.vehicle = null;
        this.propellers = [];

        this.heading = 0.0;
        this.pitch = 0.0;
        this.roll = 0.0;
        this.velocity = new Vector3();

        this.cameraMode = 0;


        /*
        this.dtStart = dtStart;
        this.dtEnd = dtEnd;
        this.animTime = animTime;
        //console.debug("Datetime anim from " + dtStart + " to " + dtEnd);
        */
    }

    loadPlayerModel() {
        const filename = "/assets/quadcopter/quadcopter-oriented.glb";
        //const filename = "/assets/parachute/scene.gltf";
        SceneLoader.ImportMesh(null, filename, '', this.sceneViewer.scene, //this.scene,
        // onSuccess
        (newMeshes, particleSystems, skeletons) => {
            newMeshes[0].setParent(null);
            newMeshes[0].setEnabled(true);
            newMeshes[0].position = new Vector3(0, 0, 0);
            this.vehicle = newMeshes[0];

            const scale = 0.75; // FIXME: This scale affects some vectors caculated below from this matrix
            newMeshes[0].scaling = new Vector3(scale, scale, -scale);

            //console.debug("Loading player model.", this.sceneViewer.scene, newMeshes[0]);
            newMeshes.forEach((mesh, _i) => {
                mesh.isPickable = false;
                mesh.receiveShadows = true;
                if ((mesh.id === "Mesh_1") || (mesh.id === "Mesh_3") || (mesh.id === "Mesh_4") || (mesh.id === "Mesh_7")) {
                    this.propellers.push(mesh);
                }
                if (this.sceneViewer.shadowGenerator) {
                    this.sceneViewer.shadowGenerator.getShadowMap().renderList.push(mesh);
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

        console.info("Initializing DroneGameProcess.");

        // Load vehicle model
        this.loadPlayerModel();
        //this.sceneViewer.loadPlayerModel();

        // Set player initial position
        //@42.2309465,-8.7266273,34a,35y,24.5h,70.25t
        this.sceneViewer.camera.detachControl();
        this.sceneViewer.camera.inputs.clear();
        this.sceneViewer.viewerState.sceneViewModeShow = false;

        // Initialize joystick
        
        const gamepadManager = new GamepadManager();
        gamepadManager.onGamepadConnectedObservable.add((gamepad, state)=>{
            console.debug("Joystick connected.");
            gamepad.onButtonDownObservable.add((button, state)=>{
                //Button has been pressed
                console.log(button);
                this.cameraMode = (this.cameraMode + 1) %2;
            })
            gamepad.onleftstickchanged((values)=>{
                //console.debug(values.x + " " + values.y);
                this.joystickThrottle = -values.y;
                this.joystickRotation = values.x;
            })
            gamepad.onrightstickchanged((values)=>{
                //console.debug(values.x + " " + values.y);
                this.joystickForward = values.y;
                this.joystickSide = values.x;
            })
        });

        // console.debug(e.code);
        window.addEventListener('keydown', (e) => {
            if (e.code in this.controlKeys) { this.controlKeys[e.code] = true; }
            if (e.code === "KeyC") {
                this.cameraMode = (this.cameraMode + 1) % 2;
            }
        } );
        window.addEventListener('keyup', (e) => { if (e.code in this.controlKeys) { this.controlKeys[e.code] = false; } });

    }

    update(deltaTime) {

        this.time += deltaTime;

        // TODO: Hacky way of initializing the process:
        // This should be called by ViewerProcesses for each new process.
        if (this.time > 1.0 && !this.initialized) {
            this.initialized = true;
            this.initialize();
        }

        if (!this.initialized) { return; }

        //this.vehicle = this.sceneViewer.vehicle;
        // Check needed objects are loaded
        if (this.vehicle === null) { return; }

        let keyboardThrottle = 0.0;
        let keyboardRotation = 0.0;
        let keyboardForward = 0.0;
        let keyboardSide = 0.0;

        if (this.controlKeys['KeyW']) { keyboardThrottle += 1.0; }
        if (this.controlKeys['KeyS']) { keyboardThrottle += -1.0; }
        if (this.controlKeys['KeyA']) { keyboardRotation += -1.0; }
        if (this.controlKeys['KeyD']) { keyboardRotation += 1.0; }
        if (this.controlKeys['ArrowUp']) { keyboardForward += -1.0; }
        if (this.controlKeys['ArrowDown']) { keyboardForward += 1.0; }
        if (this.controlKeys['ArrowLeft']) { keyboardSide += -1.0; }
        if (this.controlKeys['ArrowRight']) { keyboardSide += 1.0; }

        let controlThrottle = Scalar.Clamp(keyboardThrottle + this.joystickThrottle, -1, 1);
        let controlRotation = Scalar.Clamp(keyboardRotation + this.joystickRotation, -1, 1);
        let controlForward = Scalar.Clamp(keyboardForward + this.joystickForward, -1, 1);
        let controlSide = Scalar.Clamp(keyboardSide + this.joystickSide, -1, 1);

        // Process input
        this.throttle = controlThrottle;
        
        // Apply physics
        let rotationSpeedTarget = controlRotation * this.maxRotationSpeed;
        this.rotationSpeed = Scalar.Lerp(this.rotationSpeed, rotationSpeedTarget, 1 - (1 - 0.9) ** deltaTime);
        this.heading += this.rotationSpeed * deltaTime;
        
        let pitchTarget = controlForward * this.maxRollAngle;
        let pitchDelta = (pitchTarget - this.pitch) * this.maxRollSpeed;
        pitchDelta = Scalar.Clamp(pitchDelta, -this.maxRollSpeed, this.maxRollSpeed);
        //let pitchSpeedTarget = this.maxRollSpeed * Math.sign(pitchTarget - this.pitch);
        //pitchSpeedTarget = pitchSpeedTarget * Scalar.Clamp(Math.abs(pitchTarget - this.pitch) * 5.0, 0, 1)
        //this.pitchSpeed = Scalar.Lerp(this.pitchSpeed, pitchSpeedTarget, Scalar.Clamp(1 - (1 - 0.9) ** deltaTime, 0, 1));
        this.pitch += pitchDelta * deltaTime;

        let rollTarget = controlSide * this.maxRollAngle;
        let rollDelta = (rollTarget - this.roll) * this.maxRollSpeed;
        rollDelta = Scalar.Clamp(rollDelta, -this.maxRollSpeed, this.maxRollSpeed);
        //let rollSpeedTarget = this.maxRollSpeed * Math.sign(rollTarget - this.roll);
        //rollSpeedTarget = rollSpeedTarget * Scalar.Clamp(Math.abs(rollTarget - this.roll) * 5.0, 0, 1)
        //this.rollSpeed = Scalar.Lerp(this.rollSpeed, rollSpeedTarget, Scalar.Clamp(1 - (1 - 0.9) ** deltaTime, 0, 1));
        this.roll += rollDelta * deltaTime;
        
        this.vehicle.rotation = new Vector3(this.pitch, this.heading, this.roll);

        // Forces
        let liftAccelRef = new Vector3(0, 1.0, 0.0);
        let upVectorQuaternion = new Vector3(this.pitch, this.heading, this.roll).toQuaternion();
        let liftAccelRotated = liftAccelRef.rotateByQuaternionToRef(upVectorQuaternion, new Vector3());
        const throttleAccel = 16.0 * deltaTime * (this.throttle + 1.0) * 0.5;  // Acceleration downwards is 9.8
        liftAccelRotated.scaleInPlace(throttleAccel);
        this.velocity.addInPlace(liftAccelRotated);
        
        const gravity = new Vector3(0, -9.8, 0);
        gravity.scaleInPlace(deltaTime);
        this.velocity.addInPlace(gravity);

        const dragFactor = -0.2;
        const drag = this.velocity.scale(dragFactor * deltaTime);
        this.velocity.addInPlace(drag);

        //console.debug(this.velocity);

        // Movement
        const movement = this.velocity.scale(deltaTime);

        let newPos = this.vehicle.position.clone();
        newPos.addInPlace(movement);

        // Floor
        let [terrainElevation, terrainMesh] = this.sceneViewer.elevationMSLFromSceneCoords(newPos);
        //console.debug(terrainElevation);
        if (terrainElevation !== null && (newPos.y - 0.35 < terrainElevation)) {
            newPos.y = terrainElevation + 0.35;
            this.velocity.y = Math.abs(this.velocity.y * 0.3);
        }
        if (terrainElevation !== null && terrainElevation < 2.0 && newPos.y < 1.0) {
            // Ugly workaround for wrong terrain elevation calculation on the origin of coordinates (need to debug what causes it)
            newPos.x += 1 * deltaTime;
        }

        this.vehicle.position = newPos;


        if (this.cameraMode === 0) {
            // Update camera to follow target from behind
            let cameraTargetPos = new Vector3(0, 4, -12);
            let cameraTargetPosWorld = Vector3.TransformCoordinates(cameraTargetPos, this.vehicle.getWorldMatrix());
            let cameraNewPos = Vector3.Lerp(this.sceneViewer.camera.position, cameraTargetPosWorld, Scalar.Clamp(1.5 * deltaTime, 0, 1));
            this.sceneViewer.camera.position = cameraNewPos;
            this.sceneViewer.camera.rotation = Vector3.Zero();
            this.sceneViewer.camera.upVector = Vector3.Up();
            this.sceneViewer.camera.setTarget(this.vehicle.position);
        } else {
            // Update camera for first person view
            let cameraTargetPos = new Vector3(0, 0.6, 0);
            let cameraTargetPosWorld = Vector3.TransformCoordinates(cameraTargetPos, this.vehicle.getWorldMatrix());
            this.sceneViewer.camera.position = cameraTargetPosWorld;
            this.sceneViewer.camera.rotation = new Vector3(-this.pitch, this.heading + Math.PI, -this.roll);
            //this.sceneViewer.camera.upVector = ;
        }

        // Propellers
        const propellerAngularSpeed = 10.0 * Math.PI;
        for (let i = 0; i < this.propellers.length; i++) {
            this.propellers[i].rotate(Axis.Z, propellerAngularSpeed * deltaTime * ((i % 2) ? -1 : 1), Space.LOCAL);
        }

    }

}

export { DroneGameProcess };
