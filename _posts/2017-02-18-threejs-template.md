---
layout: post
title: Template for posts using Three.js WebGL graphics
---


Embedding [three.js](https://github.com/mrdoob/three.js/) and [dat.gui](https://github.com/dataarts/dat.gui) on a Jekyll blog. 

### Cubemap Demos

<script type="text/javascript" src="/public/js/three.js"></script>
<script type="text/javascript" src="/public/js/OrbitControls.js"></script>
<script type="text/javascript" src="/public/js/BasicScenes.js"> </script>


<h2>Three.js Cube Projector for JSmol</h2>

<div>

        <h3>1. Textured Cube</h3>
        <p>Here, each of the six images from the cube map is loaded separately.<br>
        They are combined into a MeshFaceMaterial and applied to the cube.<br>
        You can see how the pieces of the cube map match up at the edges.</p>

        <canvas width="600" height="600" id="cnvs1" style="background-color:white" onmouseover="document.body.style.overflow='hidden';" onmouseout="document.body.style.overflow='auto';"  ></canvas> 

</div>
        

<div>
        <h3>Skybox</h3>
        <p>This is simlar to the first example, but the cube is viewed from the<br>
        inside, and the face materials are MeshBasicMaterials instead of<br>
        MeshPhongMaterial.  No lighting is used in this scene.</p>
        <canvas width="600" height="600" id="cnvs2" style="background-color:white" onmouseover="document.body.style.overflow='hidden';" onmouseout="document.body.style.overflow='auto';"  ></canvas> 

</div>





