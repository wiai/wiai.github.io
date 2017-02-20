/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v58)
*/

// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
// custom global variables
var cube;

init();
animate();

// FUNCTIONS 		
function init() 
{
    
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
    
     
    
    
	// SCENE
	scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xFFFFFF );
    var ambient = new THREE.AmbientLight( 0x222222 );
    scene.add( ambient );
    
	// CAMERA
	var SCREEN_WIDTH = theCanvas.width, SCREEN_HEIGHT = theCanvas.height;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(400,150,800);
	camera.lookAt(scene.position);	
    
    // LIGHT
	var light = new THREE.DirectionalLight(0x555555);
	light.position.set(0,1,0);
	scene.add(light);
    var light2 = new THREE.DirectionalLight(0x555555);
    light2.position.set(0,-1,0); 
    scene.add(light2);

    var light = new THREE.PointLight(0xaaaaaa);
	light.position.set(0,100,0);
	scene.add(light);
    var light2 = new THREE.PointLight(0xaaaaaa);
    light2.position.set(0,-100,0); // Shine along the z-axis in object coordinates, same direction camera faces.
    scene.add(light2);


//	// RENDERER
//	if ( Detector.webgl )
//		renderer = new THREE.WebGLRenderer( {antialias:true} );
//	else
//		renderer = new THREE.CanvasRenderer(); 
    
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	//container = document.getElementById( 'cnvs1' );
	//container.appendChild( renderer.domElement );
	// EVENTS
//	THREEx.WindowResize(renderer, camera);
//	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
    
    
    
    
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	// STATS
	/*
    stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	*/

    
    
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( '/public/images/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 7, 7 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, transparent: true, opacity:0.7, alphaTest: 0.7, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	
	// crystal layers
    /*
	var floor1 = new THREE.Mesh(floorGeometry, floorMaterial);
	floor1.position.y = -1.5;
	floor1.rotation.x = Math.PI / 2;
	scene.add(floor1);
	var floor2 = new THREE.Mesh(floorGeometry, floorMaterial);
	floor2.position.y = 0.5;
	floor2.rotation.x = Math.PI / 2;
	scene.add(floor2);
	*/
	
	// SKYBOX/FOG
	//var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	//var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	//var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	//scene.add(skyBox);
	
	////////////
	// CUSTOM //
	////////////
	
	var materialNormal = new THREE.MeshNormalMaterial();
	
    /*
	var cubeGeometry = new THREE.CubeGeometry( 100, 100, 100, 1, 1, 1 );
	var cubeMesh = new THREE.Mesh( cubeGeometry );
	var cubeBSP = new ThreeBSP( cubeMesh );
		
	var sphereGeometry = new THREE.SphereGeometry( 60, 32, 32 );
	var sphereMesh = new THREE.Mesh( sphereGeometry );
	var sphereBSP = new ThreeBSP( sphereMesh );
	*/
	// Example #1 - Cube subtract Sphere
	/*
    var newBSP = cubeBSP.subtract( sphereBSP );
	var newMesh = newBSP.toMesh( materialNormal );
	newMesh.position.set(-180, 60, 0);
	scene.add( newMesh );
    */

	// Example #2 - Sphere subtract Cube
	//var newBSP = sphereBSP.subtract( cubeBSP );
	//var newMesh = newBSP.toMesh( materialNormal );
	//newMesh.position.set(180, 60, 0);
	//scene.add( newMesh );
	
	// Example #3 - Cube union Sphere
	//var newBSP = sphereBSP.union( cubeBSP );
	//var newMesh = newBSP.toMesh( materialNormal );
	//newMesh.position.set(70, 60, -120);
	//scene.add( newMesh );

	// Example #4 - Cube intersect Sphere
	//var newBSP = sphereBSP.intersect( cubeBSP );
	//var newMesh = newBSP.toMesh( materialNormal );
	//newMesh.position.set(-70, 60, -120);
	//scene.add( newMesh );
	
	
	// cone
    // Cylinder constructor parameters:  
    // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight
    
    
    var smallCylinderGeom = new THREE.CylinderGeometry( 398, 1, 100, 30, 4 );
    var largeCylinderGeom = new THREE.CylinderGeometry( 400, 2, 100, 30, 4 );
    var smallCylinderBSP = new ThreeBSP(smallCylinderGeom);
    var largeCylinderBSP = new ThreeBSP(largeCylinderGeom);
    var intersectionBSP = largeCylinderBSP.subtract(smallCylinderBSP);      
    var redMaterial = new THREE.MeshLambertMaterial( { color: 0xff0000, transparent: true, opacity:0.9, alphaTest: 0.9 } );
    var hollowCone1 = intersectionBSP.toMesh( redMaterial );
	var hollowCone2 = intersectionBSP.toMesh( redMaterial );
	hollowCone1.rotation.x = Math.PI;
	hollowCone1.position.set(0, -52, 0);
	hollowCone2.position.set(0,  52, 0);
    scene.add( hollowCone1 );
	scene.add( hollowCone2 );
	
	
	
    // create a set of coordinate axes to help orient user
	//    specify length in pixels in each direction
	var axes = new THREE.AxisHelper(200);
	scene.add( axes );
	
	
	
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	if ( keyboard.pressed("z") ) 
	{ 
		// do something
	}
	
	controls.update();
	//stats.update();
}

function render() 
{
	renderer.render( scene, camera );
}


// load dat menu
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



