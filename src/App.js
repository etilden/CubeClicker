import React from 'react';
import * as THREE from "three";

class App extends React.Component {
  constructor() {
    super()

    this.state={
      cubes: []
    }

    this.clickLocator = this.clickLocator.bind(this)
    this.cubeIncludes = this.cubeIncludes.bind(this)
    this.directionChanger = this.directionChanger.bind(this)
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
    function makeInstance(geometry, color, x, y, name) {
      const material = new THREE.MeshPhongMaterial({color});
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      cube.position.x = x; 
      cube.position.y = y;
      cube.name = name;
      return cube;  
    }

    const cubeA = makeInstance(geometry, 0x44aa88, 0, 0, 'greenish');
    const cubeB = makeInstance(geometry, 0x8844aa, -2, -2, 'purple');
    const cubeC = makeInstance(geometry, 0xaa8844,  1, 1, 'yellow');
    
    const cubes = [
      cubeA,
      cubeB,
      cubeC,
    ];

    this.setState({cubes: [...cubes]})
    
    // spin
    let animate = function () {
      requestAnimationFrame( animate );
      cubes.forEach((cube, i) => {
        let additional = (i+1)*0.01
        cube.rotation.x += additional;
        cube.rotation.y += additional;

      })
      renderer.render( scene, camera );
    };
    animate();
    

    //travel
    let travel = function (xdifferentiation = 0.01, ydifferentiation = 0.01) {
      requestAnimationFrame( travel );
      cubes.forEach((cube) => {
          if (cube.position.x <= 9 && cube.position.x >= -9) {
            xdifferentiation*=(-1);
            // ydifferentiation*=(-1);
          }
          if (cube.position.y <= 5 && cube.position.y >= -5) {
            // xdifferentiation*=(-1)
            ydifferentiation*=(-1);
          }
          if (cube.position.x > 9 || cube.position.x < -9 || cube.position.y > 5 || cube.position.y < -5) {
            renderer.setClearColor(0xFF0000)
          }
          cube.position.x += xdifferentiation;
          cube.position.y -= ydifferentiation;
      })
      renderer.render( scene, camera );
    };
    travel();   
  }

  //access location of click
  clickLocator = (event) => {
    let [clickedCube]= this.state.cubes.filter(cube => this.cubeIncludes(cube, event.pageX, event.pageY));
    if (clickedCube) {
      this.directionChanger(clickedCube)
    }
  }

  //does click fall onto a cube
  cubeIncludes = function(cube, clickX, clickY) {
    let cubeX = {
      xPosition: cube.position.x * 80 + 720,
      xMin: cube.position.x * 80 + 651,
      xMax: cube.position.x * 80 + 789,
    };
  
    let cubeY = {
      yPosition: cube.position.y * 87.7 + (window.innerHeight/2),
      yMin: -1*cube.position.y * 87.7 + (window.innerHeight/2) - 69,
      yMax: -1*cube.position.y * 87.7 + (window.innerHeight/2) + 69,
    };
  
    if (
      clickX >= cubeX.xMin &&
      clickX <= cubeX.xMax &&
      clickY >= cubeY.yMin &&
      clickY <= cubeY.yMax
    ) {
      return cube;
    }
  };

  //if click falls on a cube change that cube's location
  directionChanger = cube => {
    console.log('cube', cube, 'x', cube.position.x, 'y', cube.position.y)
    cube.position.x = 1
    cube.position.y = 1
  }


  render() {
    return (
      <div />
    );
  }
}

export default App;
