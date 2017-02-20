---
layout: post
title: Kossel Cones in three.js
---

This is a simple example of embedding WebGL 3D graphics via [three.js](https://github.com/mrdoob/three.js/) into a blog post. 



<!--
<div id='canvas-holder' style="position:relative; width: 100%;" onmouseover="document.body.style.overflow='hidden';" onmouseout="document.body.style.overflow='auto';" >
  <div id="dat-gui-holder" style="position: absolute; top: 0em; right: 0em;z-index: 1;" ></div>
</div>
-->

<div id='canvas-holder' style="position:relative; width: 100%;" onmouseover="document.body.style.overflow='hidden';" onmouseout="document.body.style.overflow='auto';" >
    <div id="dat-gui-holder" style="position: absolute; top: 0em; right: 0em;z-index: 1;" ></div>
    <canvas width="600" height="400" id="cnvs1" style="background-color:white" onmouseover="document.body.style.overflow='hidden';" onmouseout="document.body.style.overflow='auto';"  ></canvas> 
</div>



<!--Load three.js-->
<script src="/public/js/three.js"></script>
<script src="/public/js/dat.gui.min.js"></script>
<script src="/public/js/OBJLoader.js"></script>
<script src="/public/js/SubdivisionModifier.js"></script>  
<script src="/public/js/OrbitControls.js"></script>  
<script src="/public/js/Stats.js"></script>  


<script src="/public/js/Detector.js"></script>
<script src="/public/js/THREEx.KeyboardState.js"></script>
<script src="/public/js/THREEx.FullScreen.js"></script>
<script src="/public/js/THREEx.WindowResize.js"></script>
<script src="/public/js/ThreeCSG.js"></script>


<script src="/public/js/kossel.js"></script>

Kossel Cones show the directions in which waves of a specific wavelength can be reflected from a lattice plane.
In particular, Bragg's law is valid for a pair of directions which lie simultaneosly on the Kossel cones and in a plane perpendicular to the
lattice plane (the optical plane of mirror reflection).

   






