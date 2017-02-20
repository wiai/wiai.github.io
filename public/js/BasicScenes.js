"use strict";

// standard global variables
var container, scene, camera, renderer, controls, stats;
// var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube;



/**
 *  Loads a list of textures.  If a callback function is provided, it is
 *  called once after all textures are loaded.  This is used to load a
 *  set of six textures to use with MeshFaceMaterial.  Used for
 *  world1 and world2
 */
function loadTextures(textureURLs, callback) {
   var loaded = 0;
   function loadedOne() {
       loaded++;
       if (callback && loaded == textureURLs.length) {
           for (var i = 0; i < textureURLs; i++)
               textures[i].needsUpdate = true;
           callback();
       }
   }
   var textures = [];
   for (var i = 0; i < textureURLs.length; i++) {
       var tex = THREE.ImageUtils.loadTexture( textureURLs[i], undefined, loadedOne );
       textures.push(tex);
   }
   return textures;
}

/**
 *  Loads a set of six textures as a single cubemap texture.  Used for world3.
 */
function loadCubemapTexture(textureURLs, callback) {
    var tex = THREE.ImageUtils.loadTextureCube( textureURLs, undefined, callback );
    return tex;
}

/**
 *  This page uses THREE.OrbitControls to let the user use the mouse to rotate
 *  the view.  OrbitControls are designed to be used during an animation, where
 *  the rotatino is updated as part of preparing for the next frame.  The scene
 *  is not automatically updated just because the user drags the mouse.  To get
 *  the rotation to work without animation, I add another mouse listener to the
 *  canvas, just to call the render() function when the user drags the mouse.
 *  The render() function includes updating of the OrbitControls.  The element
 *  parameter here will be the canvas, and the dragAction is render.
 */
function setupDragAction(element, dragAction) {
    function move() {
        dragAction();
    }
    function down() {
        document.addEventListener("mousemove", move, false);
    }
    function up() {
        document.removeEventListener("mousemove", move, false);
    }
    element.addEventListener("mousedown", down, false);
}


/**
 *  Sets up the first canvas.  This function is also used as a scope
 *  to keep the scene, camera, controls, etc for this world separate
 *  from those for the other two worlds.
 *      World1 shows a cube with a cube map texture viewed from the
 *  outside of the cube.  The textures are loaded as six separate
 *  THREE.Texture objects, and a MeshFaceMaterial is used to apply
 *  the textures to the six faces of the cube.  Each face uses a
 *  MeshPhongMaterial, and the scene has a light to illuminate the
 *  cube.
 *      Note that this function returns true or false to indicate
 *  whether it was possible to set up WebGL.  If not, no attempt
 *  is made to set up the other two worlds.
 */
function world1() {

    var scene, camera, renderer;  // Three.js rendering basics.

    var cube; // The cube -- the only object in the scene.

    var textureURLs = [  // URLs of the six faces of the cube map 
            "/public/data/1.jpg",   // Note:  The order in which
            "/public/data/2.jpg",   //   the images are listed is
            "/public/data/3.jpg",   //   important.
            "/public/data/4.jpg",  
            "/public/data/5.jpg",   
            "/public/data/6.jpg"
       ];

    var controls;  // The OrbitControls, used to let the user rotate the cube by mouse.

    function render() {
        controls.update();  // Apply any change in rotation from the controls.
        renderer.render(scene, camera);
    }

    var theCanvas = document.getElementById("cnvs1");
    
    if (!theCanvas || !theCanvas.getContext) {
        document.getElementById("message").innerHTML = 
                     "Sorry, this page does support canvas graphics.";
        return;
    }
    try {
        if (window.WebGLRenderingContext) {
            renderer = new THREE.WebGLRenderer( { 
               canvas: theCanvas, 
               antialias: true
            } );
        } 
    }
    catch (e) {
    }
    if (!renderer) {
        document.getElementById("message").innerHTML = 
                       "Sorry, WebGL is required but is not available.";
        return false;
    }
    
    /* Set up the scene with a camera and light.  The light is attached to the camer
       so that it always shines in the direction the camera is facing. */
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    var ambient = new THREE.AmbientLight( 0x101010 );
    scene.add( ambient );
    //var directionalLight = new THREE.DirectionalLight( 0x333333 );
    //directionalLight.position.set( 1, 1, 1 );
    //camera.add( directionalLight );
    
    
    
    camera = new THREE.PerspectiveCamera(45, theCanvas.width/theCanvas.height, 1, 100);
    var light = new THREE.DirectionalLight();
    light.position.set(0,0,1); // Shine along the z-axis in object coordinates, same direction camera faces.
    camera.add(light);
    //camera.add( directionalLight );
    scene.add(camera);
    camera.position.z = 50;
    
    /* Load the six image textures and create the six face materials. */
    var textures = loadTextures(textureURLs, render);
    var materials = [];
    for (var i = 0; i < 6; i++) {
        materials.push( new THREE.MeshPhongMaterial( {
            color: "white",
            map: textures[i]
        } ) );
    }
    
    /* Create a cube with the six textures on the six faces of the cube. */
    cube = new THREE.Mesh( new THREE.CubeGeometry(20,20,20), new THREE.MeshFaceMaterial(materials) );
    scene.add(cube);
    
    /* Add controls so the user can rotate the view with the mouse.
       Add another mouse listener to call render when the mouse is dragged. */
    controls = new THREE.OrbitControls(camera,theCanvas,theCanvas);
    
    setupDragAction(theCanvas, render);

    render();
    return true;
    
} // end world1()


/**
 *  Sets up the second canvas.  The same cube map texture is assigned to a cube, but in this
 *  scene, the camera is inside the cube.  The face materials are MeshBasicMaterial, so no
 *  light is needed to see it.  This scene does not use lighting at all.  A cube used in
 *  this way is called a "skybox."
 */
function world2() {

    var scene, camera, renderer;

    var textureURLs = [  // URLs of the six faces of the cube map 
            "/public/data/1.jpg",   // Note:  The order in which
            "/public/data/2.jpg",   //   the images are listed is
            "/public/data/3.jpg",   //   important.
            "/public/data/4.jpg",  
            "/public/data/5.jpg",   
            "/public/data/6.jpg"
       ];


    var controls;

    var cube;

    function render() {
        controls.update();
        renderer.render(scene, camera);
    }

    var theCanvas = document.getElementById("cnvs2");
    
    renderer = new THREE.WebGLRenderer( { 
       canvas: theCanvas, 
       antialias: true
    } );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, theCanvas.width/theCanvas.height, 1, 100); 
                                 // Note: far distance must be large enought to include the cube!
    scene.add(camera);
    camera.position.z = 3;  // Can't be right at 0, or the controls won't rotate it.
    var textures = loadTextures(textureURLs, render);
    var materials = [];
    for (var i = 0; i < 6; i++) {
        materials.push( new THREE.MeshBasicMaterial( {
            color: "white",
            side: THREE.BackSide,  // IMPORTANT: To see the inside of the cube, back faces must be rendered!
            map: textures[i]
        } ) );
    }
    cube = new THREE.Mesh( new THREE.CubeGeometry(100,100,100), new THREE.MeshFaceMaterial(materials) );
    scene.add(cube);
    controls = new THREE.OrbitControls(camera,theCanvas);
    
    setupDragAction(theCanvas, render);
    render();
    
}  // end world2()


// needs global renderer (-> problem if several renderers?)
function render() 
{
	//renderer.render( scene, camera );
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	//if ( keyboard.pressed("z") ) 
	//{ 
		// do something
	//}
	
	//controls.update();
	//stats.update();
}


function init() {
   if ( world1() ) { 
        // if the first world could be set up, set up the other two.
      world2(); 
      //world3() 
   }
}


window.onload = function() {
    //guiElements = new GUIElements();
    //var gui = new dat.GUI( { autoPlace: false } );

    
    //gui.add(guiElements, 'message');
    // Tessellation level is from 0 to 3, default is 0
    //gui.add(guiElements, 'tessellations', 0, 3).step(1);
    // Number of teapots range from 1 to 200
    //gui.add(guiElements, 'teapotNum', 1, 200).step(1);
    //prevNum = 1;
    //prevTess = 0;

    //var datguiHolder = document.getElementById('dat-gui-holder');
    //var customContainer = datguiHolder.appendChild(gui.domElement);

    // Hurray!
    init();
    animate();
};


