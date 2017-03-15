---
layout: post
title: Kossel cones for a wave source inside a crystal
---

<div id="glowscript" class="glowscript">

<script type="text/javascript" src="/public/js/glowscript/jquery/jquery.min.js">
</script>
<script type="text/javascript" src="/public/js/glowscript/jquery/jquery-ui.custom.min.js">
</script>
<script type="text/javascript" src="/public/js/glowscript/glow.2.4.min.js">
</script>

<script type="text/javascript"><!--//--><![CDATA[//><!--
;(function() { var __rt=srequire('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; function main(_) { var version, scene, Azimuth, BraggAngle, dhkl, source_shift, hr, hl, ConeHeight, ConeRadius, ConeSide, ConeRadiusR, ConeSideR, lamp_front, lamp_back, DL, PlaneSize, KK1, KK2, Or, vcone, ptr, trail, vBragg, angle, da, gslabel, l1, ptr1, l2, ptr2, v1, v2; var __frame = { name: "main", line: 1 }; return __func(_, this, arguments, main, 0, __frame, function __$main() {
    version = ["2.4","glowscript",];
    scene = canvas();


    Azimuth = radians(30);
    BraggAngle = radians(25);
    dhkl = 5;
    source_shift = 0.3;

    hr = dhkl["*"](source_shift);
    hl = dhkl["*"](1["-"](source_shift));
    ConeHeight = hl;
    ConeRadius = ConeHeight["/"](tan(BraggAngle));
    ConeSide = ConeRadius["/"](cos(BraggAngle));
    ConeRadiusR = hr["/"](tan(BraggAngle));
    ConeSideR = hr["/"](cos(BraggAngle));

    scene.width = 800;
    scene.height = 600;
    scene.background = color.white;
    scene.center = vec(0, 0, 0);
    scene.forward = vec(0, 1["-u"](), 2["-u"]());
    scene.ambient = color.gray(0.5);
    lamp_front = local_light({ pos: vec(3["*"](ConeHeight), 0, 0), color: color.yellow });
    lamp_back = local_light({ pos: vec(3["-u"]()["*"](ConeHeight), 0, 0), color: color.yellow });
    DL = distant_light({ direction: vec(10["-u"](), 10, 10),
      color: color.white });

    PlaneSize = 1.1["*"](ConeRadius)["*"](2);
    box({ pos: vec(hr, 0, 0), size: vec(0.3, PlaneSize, PlaneSize), color: color.red, opacity: 0.3 });

    box({ pos: vec(0, 0, 0), size: vec(0.1, 0.7["*"](PlaneSize), 0.7["*"](PlaneSize)), color: color.blue, opacity: 0.2 });

    sphere({ pos: vec(0, 0, 0), color: color.orange, size: vec(0.85, 0.85, 0.85), opacity: 1 });
    box({ pos: vec(hl["-u"](), 0, 0), size: vec(0.3, PlaneSize, PlaneSize), color: color.red, opacity: 0.3 });
    box({ pos: vec(hl["-u"]()["-"](dhkl), 0, 0), size: vec(0.3, PlaneSize, PlaneSize), color: color.red, opacity: 0.05 });
    box({ pos: vec(hl["-u"]()["-"](2["*"](dhkl)), 0, 0), size: vec(0.3, PlaneSize, PlaneSize), color: color.red, opacity: 0.05 });
    box({ pos: vec(hr["+"](dhkl), 0, 0), size: vec(0.3, PlaneSize, PlaneSize), color: color.red, opacity: 0.05 });
    box({ pos: vec(hr["+"](2["*"](dhkl)), 0, 0), size: vec(0.3, PlaneSize, PlaneSize), color: color.red, opacity: 0.05 });
    KK1 = cone({ pos: vec(hl["-u"](), 0, 0), size: vec(ConeHeight, 2["*"](ConeRadius), 2["*"](ConeRadius)), color: color.blue, opacity: 0.4 });
    KK2 = cone({ pos: vec(hr["-u"](), 0, 0), size: vec(hr, 2["*"](ConeRadiusR), 2["*"](ConeRadiusR)), color: color.blue, opacity: 0.4 });
    KK2.rotate({ angle: pi, axis: vec(0, 0, 1), origin: vec(0, 0, 0) });
    Or = vec(0, 0, 0);
    vcone = vec(0, 0.6["*"](ConeSide), 0);
    ptr = sphere({ pos: vcone, color: color.blue, size: vec(0.1, 0.1, 0.1) });


    trail = curve({ color: color.blue, radius: 0.1 });
    trail.push(ptr.pos);
    vBragg = vec(0, 0, 0);
    angle = 0;
    da = 0.01;
    while ((angle < BraggAngle)) {

      ptr.rotate({ angle: da, axis: vec(0, 0, 1), origin: vec(0, 0, 0) });
      trail.push(ptr.pos);
      if ((angle < 0.5["*"](BraggAngle))) {
        vBragg = ptr.pos; } ;

      angle += da; };


    gslabel = label({ pos: vBragg, text: "Bragg angle",
      xoffset: 10["-u"](), yoffset: 110, height: 16, color: color.black });
    scene.autoscale = false;


    l1 = dhkl["*"](source_shift)["+"](0["*"](dhkl))["/"](tan(BraggAngle));
    ptr1 = arrow({ pos: vec(0, 0, 0), axis_and_length: vec(0, l1, 0), color: color.orange, shaftwidth: 0.3 });

    ptr1.rotate({ angle: BraggAngle["-u"](), axis: vec(0, 0, 1), origin: ptr1.pos });

    ptr1.rotate({ angle: Azimuth["-u"](), axis: vec(1["-u"](), 0, 0), origin: ptr1.pos });

    l2 = dhkl["*"](1["-"](source_shift))["+"](0["*"](dhkl))["/"](tan(BraggAngle));
    ptr2 = arrow({ pos: vec(0, 0, 0), axis_and_length: vec(0, l2, 0), color: color.orange, shaftwidth: 0.3 });

    ptr2.rotate({ angle: BraggAngle, axis: vec(0, 0, 1), origin: ptr2.pos });

    ptr2.rotate({ angle: Azimuth["-u"](), axis: vec(1["-u"](), 0, 0), origin: ptr2.pos });
    da = 0.03; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$main() { __more = false;
        var __1 = true; if (__1) {
          return rate(60, __cb(_, __frame, 83, 4, function __$main() {
            v1 = rotate(ptr1.axis_and_length, { angle: da, axis: vec(1["-u"](), 0, 0) });
            v2 = rotate(ptr2.axis_and_length, { angle: 1.345["-u"]()["*"](da), axis: vec(1["-u"](), 0, 0) });
            ptr1.axis_and_length = v1;
            ptr2.axis_and_length = v2; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(_); });};

main;

;$(function(){ window.__context = { glowscript_container: $("#glowscript").removeAttr("id") }; main(__func) })})()
//--><!]]></script>
</div>

<br>

For a point-like source of waves inside a crystal, the **Kossel Cones** show the directions 
in which waves of a specific wavelength can be reflected from the lattice planes around the source.
Note how this also works if the source is not itself on a lattice plane.



Graphics made with [GlowScript](http://www.glowscript.org/).


GlowScript code:

```javascript
GlowScript 2.4 JavaScript
/* Kossel Cones in diffraction by convergent radiation */

// azimuthal incidence direction
var Azimuth    =radians(30.0);
var BraggAngle =radians(25.0);
var dhkl = 5.0; // lattice plane distance
var source_shift = 0.3; // shift of emission source wrt plane center

// distances to lattice planes both directions
var hr= dhkl*source_shift;
var hl= dhkl*(1.0-source_shift);

var ConeHeight=hl;
var ConeRadius= ConeHeight / tan(BraggAngle);
var ConeSide=ConeRadius / cos(BraggAngle);

var ConeRadiusR= hr / tan(BraggAngle);
var ConeSideR  = hr / cos(BraggAngle);


//scene.title = "Kossel Cones"
scene.width = 800
scene.height = 600
scene.background = color.white; //gray(0.95)
scene.center = vec(0,0,0)
scene.forward = vec(0,-1,-2)  // default along negative z
scene.ambient=color.gray(0.5)


var lamp_front=local_light({pos:vec(+3*ConeHeight,0,0),color:color.yellow} )
var lamp_back =local_light({pos:vec(-3*ConeHeight,0,0),color:color.yellow} )

var DL = distant_light({direction:vec(-10,10,10), 
                    color:color.white} )



// lattice plane
var PlaneSize =1.1*ConeRadius*2;
box( {pos:vec( hr,0,0), size:vec(0.3,PlaneSize,PlaneSize), color:color.red, opacity:0.3} )


// reference plane parallel to lattice
box( {pos:vec( 0,0,0), size:vec(0.1,0.7*PlaneSize,0.7*PlaneSize), color:color.blue, opacity:0.2} )
// emission source
sphere( {pos:vec(0,0,0), color:color.orange, size:vec(0.85,0.85,0.85), opacity:1.0} ) 


box( {pos:vec(     -hl,0,0), size:vec(0.3,PlaneSize,PlaneSize), color:color.red, opacity:0.3} )

box( {pos:vec(-hl-dhkl,0,0), size:vec(0.3,PlaneSize,PlaneSize), color:color.red, opacity:0.05} )
box( {pos:vec(-hl-2*dhkl,0,0), size:vec(0.3,PlaneSize,PlaneSize), color:color.red, opacity:0.05} )

box( {pos:vec(hr+dhkl,0,0), size:vec(0.3,PlaneSize,PlaneSize), color:color.red, opacity:0.05} )
box( {pos:vec(hr+2*dhkl,0,0), size:vec(0.3,PlaneSize,PlaneSize), color:color.red, opacity:0.05} )


var KK1 = cone( {pos:vec(-hl,0,0), size:vec(ConeHeight,2*ConeRadius,2*ConeRadius), color:color.blue, opacity:0.4} )


var KK2 = cone( {pos:vec(-hr,0,0), size:vec(hr,2*ConeRadiusR,2*ConeRadiusR), color:color.blue, opacity:0.4} )
    KK2.rotate( {angle:pi, axis:vec(0,0,1), origin:vec(0,0,0)} )


var Or = vec(0,0,0);
var vcone =vec(0,0.6*ConeSide,0);


var ptr = sphere( {pos:vcone, color:color.blue, size:vec(0.1,0.1,0.1)} )  
//ptr.rotate( {angle: Azimuth, axis:vec(1,0,0), origin:Or} )
// draw Trail as Bragg angle
var trail = curve({color:color.blue, radius: .1})
trail.push(ptr.pos)

var vBragg = vec(0,0,0);
var angle = 0
var da = .01
while (angle < BraggAngle) {
  //rate(100,wait)
  ptr.rotate( {angle:da, axis:vec(0,0,1), origin:vec(0,0,0)} )
  trail.push(ptr.pos)
  if (angle<0.5*BraggAngle){
      vBragg = ptr.pos; // save for billboard
  }
  angle += da
}


// billboard label the Bragg angles
var gslabel = label({pos:vBragg, text:'Bragg angle', 
    xoffset:-10, yoffset:110 ,height:16, color:color.black})

scene.autoscale = false


// example wave vector
// let this got to next lattice plane
var l1 = (dhkl*source_shift + 0*dhkl) / tan(BraggAngle)
var ptr1 = arrow( {pos:vec(0,0,0), axis_and_length:vec(0,l1,0), color:color.orange, shaftwidth:0.3 } )
// rotate into Kossel Cone
ptr1.rotate( {angle: -BraggAngle, axis:vec(0,0,1), origin:ptr1.pos} )
// rotate Arrow1 into Azimuth
ptr1.rotate( {angle: -Azimuth, axis:vec(-1,0,0), origin:ptr1.pos} )

// let this got to next lattice plane
var l2 = (dhkl*(1.0-source_shift) + 0*dhkl) / tan(BraggAngle)
var ptr2 = arrow( {pos:vec(0,0,0), axis_and_length:vec(0,l2,0), color:color.orange, shaftwidth:0.3 } )
// rotate into Kossel Cone
ptr2.rotate( {angle: BraggAngle, axis:vec(0,0,1), origin:ptr2.pos} )
// rotate Arrow1 into Azimuth
ptr2.rotate( {angle: -Azimuth, axis:vec(-1,0,0), origin:ptr2.pos} )



da=0.03
while(true){
    rate(60,wait)
    var v1 = rotate(ptr1.axis_and_length, {angle:da, axis:vec(-1,0,0)})
    var v2 = rotate(ptr2.axis_and_length, {angle:-1.345*da, axis:vec(-1,0,0)})
    ptr1.axis_and_length=v1
    ptr2.axis_and_length=v2
}
```

<br>
Rotate graphics with right mouse button. Zoom with wheel.



