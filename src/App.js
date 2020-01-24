import React from 'react';
import * as THREE from "three";

class App extends React.Component {
  componentDidMount() {

    var scene = new THREE.Scene();

    //1: field of view: the extend of the scene seen on the display at any given time
    //2: aspect ratio: usually width/height to avoid distortion
    //3 + 4: near + far clipping planes: where is too close or too far to see
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

    //sets how much of the screen this will take up. Can be used to reduce resolution
    //WebGLRenderer is used for most current browsers. 
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    
    var geometry = new THREE.BoxGeometry( 1, 2, 3 );
    var material = new THREE.MeshBasicMaterial( { color: 0x002a00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();

  }

  render() {
    return (
      <div />
    );
  }
}

export default App;
