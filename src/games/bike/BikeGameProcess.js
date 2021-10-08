/*
* DDDViewer - DDD(3Ds) Viewer library for DDD-generated GIS 3D models
* Copyright 2021 Jose Juan Montes and contributors
* MIT License (see LICENSE file)
*/


import "@babylonjs/loaders/glTF";

import { ViewerProcess } from 'ddd-viewer';
import { Axis, Logger, SceneLoader, Space, Vector3 } from '@babylonjs/core';
import { GamepadManager } from "@babylonjs/core";
import { Scalar } from "@babylonjs/core";


class EngineSound {

    constructor() {
        this.audioCtx = null;
        this.intervalId = null;
        this.source = null;

        this.pitchStep = 0.1;

        this.pitch = 1.1;  // Target pitch
    }

    initialize() {

        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        const xhr = new XMLHttpRequest();

        xhr.open("GET", "/sound/engine.wav", true);
        xhr.responseType = "arraybuffer";
        xhr.onload = (e) => {
            console.debug("Loading engine audio data.");
            const audioData = e.target.response;

            //window.addEventListener("keydown", createPitchStep(0.02))
            //window.addEventListener("keyup", createPitchStep(-0.02))

            this.source = this.audioCtx.createBufferSource();

            this.audioCtx.decodeAudioData(audioData, (buffer) => {
                this.source.buffer = buffer;
                this.source.loop = true;
                this.source.connect(this.audioCtx.destination);
                this.source.start();
            });

            this.intervalId = setInterval(() => {
                const currPitch = this.source.playbackRate.value;
                this.source.volume = 0.2;

                if (currPitch < this.pitch) {
                    this.source.playbackRate.value += this.pitchStep;
                }
                if (currPitch > this.pitch) {
                    this.source.playbackRate.value -= this.pitchStep;
                }
            }, 50);
        };

        xhr.send();
    }

    stop() {

        if (this.source) {
            this.source.stop();
            this.source = null;
            clearInterval(this.intervalId);
        }

    }
}


class BikeGameProcess extends ViewerProcess {

    initialized = false;

    constructor(sceneViewer, gameData) {

        super(sceneViewer);

        // These attributes are set by the SceneViewer/ViewerProcesses externally
        this.processes = null;
        this.finished = false;

        this.time = 0.0;

        this.gameLabel = "Bike";

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

        this.grounded = true;

        this.engineSound = null;

        /*
        this.dtStart = dtStart;
        this.dtEnd = dtEnd;
        this.animTime = animTime;
        //console.debug("Datetime anim from " + dtStart + " to " + dtEnd);
        */

        // This is to allow viewing the bike close up, but should be changed only for that model
        this.sceneViewer.scene.activeCamera.minZ = 0.1;
    }

    loadPlayerModel() {
        const filename = "/assets/bike/bike.glb";
        //const filename = "/assets/parachute/scene.gltf";
        SceneLoader.ImportMesh(null, filename, '', this.sceneViewer.scene, //this.scene,
        // onSuccess
        (newMeshes, particleSystems, skeletons) => {
            newMeshes[0].setParent(null);
            newMeshes[0].setEnabled(true);
            newMeshes[0].position = new Vector3(0, 10, 0);
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

                //mesh.renderingGroupId = 2;

            });

            //let prevMinZ = 0;
            //let prevMaxZ = 0;

            // Change camera near/far planes for bike rendering (as it's very close)
            /*
            this.sceneViewer.scene.onBeforeRenderingGroupObservable.add((group) => {
                //prevMinZ = this.sceneViewer.scene.activeCamera.minZ;
                //prevMaxZ = this.sceneViewer.scene.activeCamera.maxZ;
                if (group.renderingGroupId === 2) {
                    this.sceneViewer.scene.activeCamera.minZ = 0.01;
                    this.sceneViewer.scene.activeCamera.maxZ = 10.0;
                    this.sceneViewer.scene.activeCamera.update();
                }
            });
            this.sceneViewer.scene.onAfterRenderingGroupObservable.add((group) => {
                if (group.renderingGroupId === 2) {
                    this.sceneViewer.scene.activeCamera.minZ = 1.0; // prevMinZ;
                    this.sceneViewer.scene.activeCamera.maxZ = 4500.0; // prevMaxZ;
                    this.sceneViewer.scene.activeCamera.update();
                }
            });
            */


          },
          (_event) => {
          },
          (_scene, _msg, ex) => {
              console.log("Could not load model: " + filename, ex);
          }
       );
    }

    initialize() {

        console.info("Initializing BikeGameProcess.");

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

            if (!this.engineSound) {
                this.engineSound = new EngineSound();
                this.engineSound.initialize();
            }

        } );
        window.addEventListener('keyup', (e) => { if (e.code in this.controlKeys) { this.controlKeys[e.code] = false; } });

    }

    update(deltaTime) {

        if (deltaTime > 0.2) { deltaTime = 0.2; }

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
        //let rotationSpeedTarget = controlRotation * this.maxRotationSpeed;
        //this.rotationSpeed = Scalar.Lerp(this.rotationSpeed, rotationSpeedTarget, 1 - (1 - 0.9) ** deltaTime);

        let pitchTarget = 0 * this.maxRollAngle;
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

        const vel = this.velocity.length();
        const invertVehicleMatrix = this.vehicle.getWorldMatrix().clone();
        invertVehicleMatrix.invert();
        const velocityLocalTurnFactor = Vector3.TransformNormal(this.velocity, invertVehicleMatrix);
        let velTurnFactor = 1.0 - Scalar.Clamp(vel / (160.0 / 3.6), 0.0, 0.5);
        //this.heading += this.roll * deltaTime;
        if (velocityLocalTurnFactor.z < 0) { velTurnFactor *= -1; }  // if in reverse
        if (!this.grounded) { velTurnFactor = velTurnFactor * 0.1; }  // if in air

        let velStopFactor = Scalar.Clamp(vel / (10.0 / 3.6), 0.0, 1.0);

        const velTurnSpeed = 2.0;  // rads per second
        this.heading += this.roll * deltaTime * velTurnFactor * velStopFactor * velTurnSpeed;

        this.vehicle.rotation = new Vector3(this.pitch, this.heading, this.roll);

        // Forces
        /*
        let liftAccelRef = new Vector3(0, 1.0, 0.0);
        let upVectorQuaternion = new Vector3(this.pitch, this.heading, this.roll).toQuaternion();
        let liftAccelRotated = liftAccelRef.rotateByQuaternionToRef(upVectorQuaternion, new Vector3());
        const   throttleAccel = 16.0 * deltaTime * (this.throttle + 1.0) * 0.5;  // Acceleration downwards is 9.8
        liftAccelRotated.scaleInPlace(throttleAccel);
        this.velocity.addInPlace(liftAccelRotated);
        */

        let thrustAccelRef = new Vector3(0, 0.0, -1.0);
        let upVectorQuaternion = new Vector3(this.pitch, this.heading, this.roll).toQuaternion();
        let thrustAccelRotated = thrustAccelRef.rotateByQuaternionToRef(upVectorQuaternion, new Vector3());
        const throttleAccel = 8.0 * deltaTime * (this.throttle);  // Acceleration downwards is 9.8
        thrustAccelRotated.scaleInPlace(throttleAccel);
        if (this.grounded) {
            this.velocity.addInPlace(thrustAccelRotated);
        }

        const gravity = new Vector3(0, -9.8, 0);
        gravity.scaleInPlace(deltaTime);
        this.velocity.addInPlace(gravity);

        // Drag (grounded / air)
        const dragFactor = this.grounded ? -0.2 : -0.025;
        const drag = this.velocity.scale(dragFactor * deltaTime);
        this.velocity.addInPlace(drag);

        // Side force if touching Floor
        const sideFriction = 0.2;
        if (true || this.grounded) {
            const invertVehicleMatrix = this.vehicle.getWorldMatrix().clone();
            invertVehicleMatrix.invert();
            const velocityLocal = Vector3.TransformNormal(this.velocity, invertVehicleMatrix);
            velocityLocal.x = 0; // velocityLocal.x * (sideFriction * deltaTime);
            this.velocity = Vector3.TransformNormal(velocityLocal, this.vehicle.getWorldMatrix());
        }

        //console.debug(this.velocity);

        // Movement
        const movement = this.velocity.scale(deltaTime);

        let newPos = this.vehicle.position.clone();
        newPos.addInPlace(movement);

        // Floor
        let [terrainElevation, terrainMesh] = this.sceneViewer.elevationMSLFromSceneCoords(newPos);
        //console.debug(terrainElevation);
        if (terrainElevation !== null && (newPos.y < terrainElevation)) {
            newPos.y = terrainElevation;
            this.velocity.y = Math.max(this.velocity.y, 0);
        }

        this.grounded = false;
        if (newPos.y < terrainElevation + 0.075) {
            this.grounded = true;
        }

        // Check horizontal collision (only if over ground)
        const previousAltitude = this.vehicle.position.y;
        if (Math.abs(newPos.y - previousAltitude) > 4) {
            //console.debug("Hit");
            newPos = this.vehicle.position;
            this.velocity.scaleInPlace(-0.4);
        }

        if (terrainElevation !== null && newPos.y < 1.0) {
            // Ugly workaround for wrong terrain elevation calculation on the origin of coordinates (need to debug what causes it)
            newPos.x += 1 * deltaTime;

            if (newPos.y < terrainElevation) {
                // Move up if below surface
                newPos.y = terrainElevation + 1;
            }
        }

        this.vehicle.position = newPos;

        this.vehicle.computeWorldMatrix();

        if (this.cameraMode === 0) {
            // Update camera to follow target from behind
            let cameraTargetPos = new Vector3(0, 1.5, -3);
            let cameraTargetPosWorld = Vector3.TransformCoordinates(cameraTargetPos, this.vehicle.getWorldMatrix());
            let interpFactor = 1.0 - Math.pow(1 - 0.975, deltaTime);
            let cameraNewPos = Vector3.Lerp(this.sceneViewer.camera.position, cameraTargetPosWorld, Scalar.Clamp(interpFactor, 0, 1));
            this.sceneViewer.camera.position = cameraNewPos;
            this.sceneViewer.camera.rotation = Vector3.Zero();
            this.sceneViewer.camera.upVector = Vector3.Up();

            let targetPos = this.vehicle.position.add(new Vector3(0, 1, 0));
            this.sceneViewer.camera.setTarget(targetPos);
        } else {
            // Update camera for first person view
            let cameraTargetPos = new Vector3(0, 1.2, -0.3);
            let cameraTargetPosWorld = Vector3.TransformCoordinates(cameraTargetPos, this.vehicle.getWorldMatrix());
            this.sceneViewer.camera.position = cameraTargetPosWorld;
            this.sceneViewer.camera.rotation = new Vector3(-this.pitch + (3.0 * Math.PI / 360.0), this.heading + Math.PI, -this.roll);
            //this.sceneViewer.camera.upVector = ;
        }

        // Sound
        if (this.engineSound) {
            if (this.grounded) {
                const engineVel = this.velocity.length();
                this.engineSound.pitch = 1.0 + (engineVel / (100.0 / 3.6)) * 1.0;
            } else {
                this.engineSound.pitch = 1.2 + (this.throttle * 4.0);
            }
        }

        // Propellers
        const propellerAngularSpeed = 10.0 * Math.PI;
        for (let i = 0; i < this.propellers.length; i++) {
            this.propellers[i].rotate(Axis.Z, propellerAngularSpeed * deltaTime * ((i % 2) ? -1 : 1), Space.LOCAL);
        }

    }

}

export { BikeGameProcess };
