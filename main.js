// Imports everything available in the Three.js library.
// "THREE" will be the object we use to access classes and functionalities
// such as Scene, Camera, Mesh, Light, Renderer, Geometry, Material, etc.
import * as THREE from 'three';


// ============================================================
// 1. SCENE CREATION
// ============================================================

// Creates a new 3D scene.
// The Scene works as a "container" where we will place all the objects
// that we want to visualize: cube, lights, 3D models, camera, etc.
const scene = new THREE.Scene();

// Defines the background color of the scene.
// Here we are using the color #F0F0F0, which is a very light gray.
scene.background = new THREE.Color('#F0F0F0');


// ============================================================
// 2. CAMERA CREATION AND CONFIGURATION
// ============================================================

// Creates a camera of type PerspectiveCamera.
//
// The parameters are:
//
// 1st parameter: 75
//    This is the field of view (FOV - Field of View).
//    The higher the value, the larger the area of the scene the camera can
//    see. 75 degrees is a common value for a 3D camera.
//
// 2nd parameter: window.innerWidth / window.innerHeight
//    Represents the screen's aspect ratio.
//    We divide the width by the height of the window to prevent
//    objects from appearing distorted.
//
// 3rd parameter: 0.1
//    This is the minimum distance the camera can see.
//    Objects closer than 0.1 units will not be rendered.
//
// 4th parameter: 1000
//    This is the maximum distance the camera can see.
//    Objects farther than 1000 units will not be rendered.
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Positions the camera on the Z axis.
//
// In Three.js, the axes work like this:
// X → left / right
// Y → down / up
// Z → front / back
//
// The cube will initially be created near the center of the scene,
// so we place the camera 5 units backward along the Z axis
// to be able to see it.
camera.position.z = 5;


// ============================================================
// 3. CUBE CREATION AND ADDITION
// ============================================================

// Creates the cube's geometry.
//
// BoxGeometry is responsible for the object's SHAPE/STRUCTURE.
// In this case, it is a cube.
//
// Since no size was specified, Three.js uses the default values
// for width, height, and depth.
const geometry = new THREE.BoxGeometry();


// Creates the material that will be applied to the geometry.
//
// MeshLambertMaterial is a material that reacts to the scene's lighting.
// This means that the cube's appearance will be influenced by the lights
// that we add later.
const material = new THREE.MeshLambertMaterial({

    // Defines the cube's main color.
    // Here we use a shade of yellow.
    color: '#f8e911',

    // Defines an emissive color.
    //
    // The emissive property simulates a kind of "self-glow"
    // of the material. It does not replace the scene's lighting, but adds
    // a color contribution to the object.
    emissive: '#d37adf'
});


// Creates the 3D object (Mesh).
//
// A Mesh is basically formed by combining:
//
// GEOMETRY + MATERIAL = MESH
//
// geometry → defines the object's shape
// material → defines its appearance
//
// So here we are combining the cube we created with the material.
const cube = new THREE.Mesh(geometry, material);


// Adds the cube to the scene.
//
// Without this line, the cube would exist in memory, but would not be part
// of the scene that will be rendered.
scene.add(cube);


// ============================================================
// 4. ADDING LIGHTING
// ============================================================

// Creates a directional light.
//
// DirectionalLight simulates a light coming from a specific direction,
// such as sunlight.
//
// The first parameter is the light's color:
// 0x9CDBA6 → a greenish tone.
//
// The second parameter is the intensity:
// 10 → relatively strong intensity.
const light = new THREE.DirectionalLight(0x9CDBA6, 10);


// Defines the light's position.
//
// X = 1
// Y = 1
// Z = 1
//
// This places the light in a diagonal position relative to the cube.
//
// It is important to remember that, in the case of DirectionalLight,
// the position indicates the direction from which the light is coming.
light.position.set(1, 1, 1);


// Adds the light to the scene.
//
// Just like with the cube, the light needs to be part of the scene
// to participate in the rendering process.
scene.add(light);


// ============================================================
// 5. RENDERER CONFIGURATION
// ============================================================

// Creates the Renderer.
//
// The WebGLRenderer is responsible for transforming everything we configured
// in the 3D scene into an image that the browser can display on the screen.
//
// In other words:
//
// Scene + Camera + Lights + Objects
//                ↓
//            Renderer
//                ↓
//          Image on screen
const renderer = new THREE.WebGLRenderer();


// Defines the size of the rendering area.
//
// window.innerWidth  → current width of the browser window
// window.innerHeight → current height of the browser window
//
// This way, the canvas will occupy the entire available area of the window.
renderer.setSize(window.innerWidth, window.innerHeight);


// Adds the canvas created by Three.js to the HTML.
//
// renderer.domElement is the <canvas> element that Three.js created.
//
// document.body represents the page's <body>.
//
// Therefore, this line basically places the 3D canvas inside the body.
document.body.appendChild(renderer.domElement);


// ============================================================
// 6. SCENE ANIMATION
// ============================================================

// Creates a function responsible for controlling the animation.
//
// This function will be executed repeatedly to create the sensation
// of continuous movement.
function animate(){

    // Requests the browser to execute the function again
    // on the next animation frame.
    //
    // requestAnimationFrame is preferable to simply using
    // setInterval/setTimeout for animations because the browser
    // can synchronize rendering more effectively with the screen's
    // refresh rate.
    //
    // This creates a kind of loop:
    //
    // animate()
    //    ↓
    // requestAnimationFrame(animate)
    //    ↓
    // animate()
    //    ↓
    // requestAnimationFrame(animate)
    //    ↓
    // ... and so on.
    requestAnimationFrame(animate);


    // Increases the cube's rotation around the X axis.
    //
    // rotation.x represents the object's rotation around the X axis.
    //
    // 0.01 is a small amount added on each frame.
    // Since this happens many times per second, the cube appears
    // to rotate continuously.
    cube.rotation.x += 0.01;


    // Increases the cube's rotation around the Y axis.
    //
    // Just like with the X axis, we add 0.01 on each frame.
    //
    // Since we are changing X and Y at the same time, the cube will
    // perform a combined rotation, creating a more three-dimensional appearance.
    cube.rotation.y += 0.01;


    // Renders the scene.
    //
    // The first argument is the scene we want to draw.
    // The second argument is the camera that will be used to view
    // that scene.
    //
    // Basically:
    //
    // "Three.js, draw the scene using the camera's view."
    renderer.render(scene, camera);
}


// Starts the animation loop.
//
// Without this call, the animate() function would have only been created,
// but would never be executed.
//
// From this point on, requestAnimationFrame starts calling
// animate() continuously and the cube starts rotating.
animate();