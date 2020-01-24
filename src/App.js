import React from 'react';
import * as THREE from "three";

class App extends React.Component {
  componentDidMount() {

    var scene = new THREE.Scene();

    //1: field of view (fov): the extend of the scene seen on the display at any given time
    //2: aspect ratio: usually width/height to avoid distortion. default is 2. 
    //3 + 4: near + far clipping planes: where is too close or too far to see
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
    //(x, y, z)
    camera.position.set( 0, 0, 0 );
    camera.lookAt( 0, 0, 0 );

    //sets how much of the screen this will take up. Can be used to reduce resolution
    //WebGLRenderer is used for most current browsers. 
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //resizing code-- doesn't work as far as I can see, but not sure I need it
    // function resizeRendererToDisplaySize(renderer) {
    //   const canvas = renderer.domElement;
    //   const width = canvas.clientWidth;
    //   const height = canvas.clientHeight;
    //   const needResize = canvas.width !== width || canvas.height !== height;
    //   if (needResize) {
    //     renderer.setSize(width, height, false);
    //   }
    //   return needResize;
    // }

    // resizeRendererToDisplaySize(renderer)

  //single cube
    // let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // let material = new THREE.MeshPhongMaterial( { color: 0x117E2C } );
    // let cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // camera.position.z = 5;

    // const color = 0xFFFFFF;
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(-1, 2, 4);
    // scene.add(light);

    //   //add light to the scene
    // let animate = function () {
    //   requestAnimationFrame( animate );
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
    //   renderer.render( scene, camera );
    // };
    // animate();

  //multiple cubes
      let geometry = new THREE.BoxGeometry( 1, 1, 1 );
      camera.position.z = 5;
      
      function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.x = x; 
        return cube;  
      }

      const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
      ];

      //add light to the scene
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);


      let animate = function () {
        requestAnimationFrame( animate );
        cubes.forEach((cube, i) => {
          let additional = (i+1)*0.01
          cube.rotation.x += additional;
          cube.rotation.y += additional;
          return cube;
        })
        renderer.render( scene, camera );
      };
      animate();

  //line
    // var material = new THREE.LineBasicMaterial( { color: 0xFF0000 } );
    // var geometry = new THREE.Geometry();
    // geometry.vertices.push(new THREE.Vector3(-10, 0, 0) );
    // geometry.vertices.push(new THREE.Vector3(0, 10, 10) );
    // geometry.vertices.push(new THREE.Vector3(10, 0, 0) );
    // geometry.vertices.push(new THREE.Vector3(10, 0, 10) );
    // geometry.vertices.push(new THREE.Vector3(10, 10, 10) );
    // geometry.vertices.push(new THREE.Vector3(10, 10, 0) );

    // var line = new THREE.Line( geometry, material );
    // scene.add( line );
    // camera.position.z = 5;
    // var animate = function () {
    //   requestAnimationFrame( animate );
    //   line.rotation.x += 0.01;
    //   line.rotation.y += 0.01;
    //   renderer.render( scene, camera );
    // };
    // animate();

  //loading 3D models (the below is not for 3d models, it is from the cubes workshop. Just wanted to have a starting place)

  }

  render() {
    return (
      <div />
    );
  }
}

export default App;
