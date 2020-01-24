import React from 'react';
import * as THREE from "three";

class App extends React.Component {
  constructor() {
    super()
    this.clickLocator = this.clickLocator.bind(this)
    document.addEventListener('click', (event) => this.clickLocator(event))
  }

  componentDidMount() {

    var scene = new THREE.Scene();

    //1: field of view (fov): the extend of the scene seen on the display at any given time
    //2: aspect ratio: usually width/height to avoid distortion. default is 2. 
    //3 + 4: near + far clipping planes: where is too close or too far to see
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    //(x, y, z)
    camera.position.set( 0, 0, 0 );
    camera.lookAt( 0, 0, 0 );

    //sets how much of the screen this will take up. Can be used to reduce resolution
    //WebGLRenderer is used for most current browsers. 
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    camera.position.z = 5;

    //add light to the scene
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
    
    //make the cubes
    function makeInstance(geometry, color, x, y) {
      const material = new THREE.MeshPhongMaterial({color});
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      cube.position.x = x; 
      cube.position.y = y;
      return cube;  
    }

    const cubes = [
      makeInstance(geometry, 0x44aa88, 0, 0),
      makeInstance(geometry, 0x8844aa, -2, -2),
      makeInstance(geometry, 0xaa8844,  1, 4),
    ];

    let animate = function () {
      requestAnimationFrame( animate );
      cubes.forEach((cube, i) => {
        let additional = (i+1)*0.01
        cube.rotation.x += additional;
        cube.rotation.y += additional;
        // cube.position.x += 0.01
      })
      renderer.render( scene, camera );
    };
    animate();
  }

  clickLocator = (event) => {
    console.log('hello')
    console.log(event)
  }

  render() {
    return (
      <div onClick={(event) => this.clickLocator(event)}></div>
    );
  }
}

export default App;
