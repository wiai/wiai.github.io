---
layout: post
title: Exploding Teapot for Jekyll with Three.js
---

This Example is mostly copied from  [http://longqian.me/2017/02/06/jekyll-threejs/]
(http://longqian.me/2017/02/06/jekyll-threejs/)


Embedding [three.js](https://github.com/mrdoob/three.js/) and [dat.gui](https://github.com/dataarts/dat.gui) on a Jekyll blog. 

### Demo

<style>
.highlight-left {margin-left: 0}
canvas { position: relative; top: 0;}
</style>

<div id='canvas-holder' style="position:relative; width: 100%;">
  <div id="dat-gui-holder" style="position: absolute; top: 0em; right: 0em;z-index: 1;" ></div>
</div>

<!--Load three.js-->
<script src="/public/js/three.min.js"></script>
<script src="/public/js/dat.gui.min.js"></script>
<script src="/public/js/OBJLoader.js"></script>
<script src="/public/js/SubdivisionModifier.js"></script>  


<script type="x-shader/x-vertex" id="vertexshader">
attribute float distance;
attribute vec3 surfaceNormal;
uniform float amplitude;
varying vec3 vNormal;
void main() {
    vNormal = normal;
    vec3 newPosition = position + surfaceNormal * vec3(distance * amplitude);
    gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(newPosition,1.0);
}
</script>

<script type="x-shader/x-fragment" id="fragmentshader">
varying vec3 vNormal;
void main() {
    vec3 light = vec3(0.7, 0.5, 1.0);
    light = normalize(light);
    float dProd = max(0.0, dot(vNormal, light));
    gl_FragColor = vec4(dProd, // R
                        dProd, // G
                        dProd, // B
                        1.0);  // A
} 
</script>
<script src="/public/js/teapot.js"></script>


#### Dat.gui holder

This `div` element is used for holding the dat.gui, in order for manipulate the location of the GUI easier.

The combination of canvas holder and dat.gui holder can be specified like this:

{% highlight html %}
<style>
  canvas { width: inherit; position: relative; top: 0;}
</style>
<div id='canvas-holder' style="position: relative; width: inherit;">
  <div id="dat-gui-holder" style="position: absolute; top: 0em; right: 0em; z-index: 1;"></div>
</div>
{% endhighlight %}{: .highlight-left }

The dat.gui holder has two interesting style definitions:

* `position:absolute` places the GUI at fixed location relative to the parent.
* `z-index:1` places the GUI on top of the canvas, aka **overlay**.

You might noticed the additional style definition for canvas. Basically, it forces the actual rendered canvas to be the same size of the canvas holder.

#### Scripts

The auto placement of dat.gui should be turned off when it is initialized, [example](http://codepen.io/eternalminerals/pen/avZBOr).

{% highlight javascript %}
var gui = new dat.GUI( { autoPlace: false } );
// Definition of GUI elements goes here
document.getElementById('dat-gui-holder').appendChild(gui.domElement);
{% endhighlight %}{: .highlight-left }

In addition, the canvas is put inside canvas holder :

{% highlight javascript %}
var canvasHolder = document.getElementById('canvas-holder');
// Apply your desired aspect ratio
var width = canvasHolder.clientWidth;
var height = width * 0.8;
canvasHolder.clientHeight = height;
renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
canvasHolder.appendChild( renderer.domElement );
{% endhighlight %}{: .highlight-left }


