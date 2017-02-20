---
layout: post
title: Glowscript in Github Jekyll pages
---

There are several options for making a VPython/GlowScript scene available from your GitHub page. 
(see also the markdown source of this post for the actual code)


### 1. Embedding the scene as JavaScript exported  by the GlowScript site

<div id="glowscript" class="glowscript">

<script type="text/javascript" src="/public/js/glowscript/jquery/jquery.min.js">
</script>
<script type="text/javascript" src="/public/js/glowscript/jquery/jquery-ui.custom.min.js">
</script>
<script type="text/javascript" src="/public/js/glowscript/glow.2.4.min.js">
</script>

<script type="text/javascript"><!--//--><![CDATA[//><!--
;(function() { var __rt=srequire('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; function main(_) { var version, scene, s, drag, gslabel, ball, ptr, spring, angle, da, trail, t, dt, y0, ball_yo; var __frame = { name: "main", line: 1 }; return __func(_, this, arguments, main, 0, __frame, function __$main() {
    version = ["2.4","glowscript",];
    scene = canvas();
    drag = false;
    scene.bind("mousedown", function() {
      s = sphere({ color: color.magenta });
      s.pos = scene.mouse.pos;
      drag = true; });

    scene.bind("mousemove", function() {
      if (!drag) { return; } ;
      s.pos = scene.mouse.pos; });

    scene.bind("mouseup", function() {
      s.visible = false;
      drag = false; });

    scene.title = "A display of most GlowScript 3D objects";
    scene.width = 640;
    scene.height = 400;
    scene.background = color.gray(0.7);
    scene.center = vec(0, 0.5, 0);
    scene.forward = vec(0.3["-u"](), 0, 1["-u"]());
    gslabel = label({ pos: vec(1.1, 2, 0), text: "GlowScript",
      xoffset: 40, height: 16, color: color.yellow });
    box({ pos: vec(2["-u"](), 0, 0), size: vec(0.3, 2.5, 2.5), color: color.red });
    box({ pos: vec(0.25, 1.4["-u"](), 0), size: vec(4.8, 0.3, 2.5), color: color.red });
    cylinder({ pos: vec(2["-u"](), 2, 1.25), size: vec(2.5, 1.4, 1.4), axis: vec(0, 0, 1["-u"]()), color: color.blue });
    ball = sphere({ pos: vec(2, 1, 0), size: 1.2["*"](vec(1, 1, 1)), color: color.cyan });
    ptr = arrow({ pos: vec(0, 0, 2), axis_and_length: vec(2, 0, 0), color: color.yellow });
    cone({ pos: vec(2["-u"](), 0, 0), size: vec(3, 2, 2), color: color.green, opacity: 0.3 });
    ring({ pos: vec(0.2, 0, 0), size: 1.2["*"](vec(0.2, 1, 1)), axis: vec(1, 0, 0), color: color.gray(0.4) });
    sphere({ pos: vec(0.3["-u"](), 2, 0), color: color.orange, size: vec(0.3, 1.5, 1.5) });
    pyramid({ pos: vec(0.3, 2, 0), color: vec(0, 0.5, 0.25), size: vec(0.8, 1.2, 1.2) });
    spring = helix({ pos: vec(2, 1.25["-u"](), 0), size: vec(1.8, 0.6, 0.6), axis: vec(0, 1, 0),
      color: color.orange, thickness: 0.1 });
    angle = 0;
    da = 0.01;
    trail = curve({ color: color.magenta, radius: 0.02 });
    trail.push(vec(1, 0, 0));
    trail.push(vec(1, 0, 2));
    trail.push(vec(2, 0, 2)); return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$main() { __more = false;
        var __1 = (angle < 3["*"](pi)["/"](4)); if (__1) {
          return rate(100, __cb(_, __frame, 47, 2, function __$main() {
            ptr.rotate({ angle: da, axis: vec(0, 0, 1), origin: ptr.pos });
            trail.push(ptr.pos["+"](ptr.axis_and_length));
            angle += da; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$main() {

      return sleep(1, __cb(_, __frame, 52, 0, function __$main() {
        scene.autoscale = false;
        scene.caption = "Drag the mouse and you'll drag a sphere.\nOn a touch screen, press and hold, then drag.";
        t = 0;
        dt = 0.01;
        y0 = gslabel.pos.y;
        ball_yo = ball.pos.y; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$main() { __more = false;
            var __4 = (t < 10); if (__4) {
              return rate(1["/"](dt), __cb(_, __frame, 60, 2, function __$main() {
                ball.pos = vec(ball.pos.x, ball_yo["+"](0.5["*"](sin(4["-u"]()["*"](t), 0))), 0);
                spring.size.x = ball.pos.y["-"](spring.pos.y)["-"](ball.size.y["/"](2))["+"](0.15);
                gslabel.yoffset = 28["*"](sin(4["-u"]()["*"](t)));
                t += dt; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(_); }, true)); }); });};main;

;$(function(){ window.__context = { glowscript_container: $("#glowscript").removeAttr("id") }; main(__func) })})()
//--><!]]></script>

</div>
<br>

From [www.glowscript.org](http://www.glowscript.org/docs/GlowScriptDocs/libraryuse.html):

> By far the *easiest* way to embed a glowscript program in your web page is to edit it at glowscript.org and then use the "Share" feature to get HTML source, which can be inserted into your own web page. This is easiest because the glowscript.org environment applies a number of transformations of GlowScript programs to add operator overloading for vectors and the ability to write infinite loops and yet update the window.


However, for use on GitHub, the references to the necessary JavaScript libraries must be via https, which GlowScript does not seem  to provide at the moment. This can be overcome by hosting these libraries inside the GitHub project. Moreover, in this way the Github site can also be run as a local static site on your computer by using "jekyll serve". 

1. copy the Javascript libraries from the [GlowScript Githbub project](https://github.com/BruceSherwood/glowscript)
 to your own Github repository (e.g. into /public/js) e.g.:

   * jquery.min.js
   * jquery-ui.custom.min.js
   * glow.2.4.min.js

2. Edit your GlowScript scene on http://www.glowscript.org/

3. Use "Share or export this program" in the GlowScript editor to get the JavaScript code for the scene

4. paste this code into the markdown/html of the post; make sure that the links to the libraries refer to the copies in ypour respository or that they are loaded from https not http in order to work directly from Github (note the absence of https access glowscript presently, Feb 2017 )

The libraries can be imported e.g. like this (compare to the corresponding section of the JavaScript code obtained from the GlowScript.org editor):

```javascript
<script type="text/javascript" src="/public/js/glowscript/jquery/jquery.min.js">
</script>
<script type="text/javascript" src="/public/js/glowscript/jquery/jquery-ui.custom.min.js">
</script>
<script type="text/javascript" src="/public/js/glowscript/glow.2.4.min.js">
</script>
```





<br>
### 2. Use GlowScript directly as a JavaScript library

From [www.glowscript.org](http://www.glowscript.org/docs/GlowScriptDocs/libraryuse.html):

> A knowledgable JavaScript programmer should be able to make use of the 'glow' JavaScript library directly, and this could make sense for some purposes.  One would have to write a tiny bit of initialization boilerplate to create a canvas, and one would have to write in pure JavaScript, without operator overloading and with function callbacks instead of the wait keyword.


Minimal working example (import glow.2.4.min.js, jquery etc like explained above):

```javascript
<div id="glowscr" class="glowscript">
   <script type="text/javascript">
   window.__context = { glowscript_container:    $("#glowscr").removeAttr("id") }

   var scene = canvas()
   var b = box()

   function spin() {
      b.rotate({angle:0.01, axis:vec(0,1,0)})
      rate(100, spin) // make spin a callback
   }

   spin()
   
   </script>
</div>
```

<div id="glowscr" class="glowscript">
   <script type="text/javascript">
   window.__context = { glowscript_container:    $("#glowscr").removeAttr("id") }

   var scene = canvas()
   var b = box()

   function spin() {
      b.rotate({angle:0.01, axis:vec(0,1,0)})
      rate(100, spin) // make spin a callback
   }

   spin()
   </script>
</div>

<br>
### 3. Embed scene from [Trinket.io](https://trinket.io/)

[https://trinket.io/](https://trinket.io/)

>Trinket lets you run and write code in any browser, on any device.
Trinkets work instantly, with no need to log in, download plugins, or install software.
Easily share or embed the code with your changes when you're done.

You can embed a GlowScript scene as an iframe from trinket.io 
This gives the user the option of mdofifying the scene inside the browser!

```html
<iframe src="https://trinket.io/embed/glowscript/26e8369958?toggleCode=true&start=result" width="100%" height="356" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>
```
<!--
<iframe src="https://trinket.io/embed/glowscript/26e8369958?toggleCode=true&start=result" width="100%" height="356" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>
-->


<br>
### 4. Link to the code on GlowScript site

This option will transfer the user to code saved on www.glowscript.org and does not provide a scene embedded in your page:

[http://www.glowscript.org/#/user/GlowScriptDemos/folder/Examples/program/GlowScriptObjects](http://www.glowscript.org/#/user/GlowScriptDemos/folder/Examples/program/GlowScriptObjects)

