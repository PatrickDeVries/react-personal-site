import React, { useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { MainNavigation } from '.';
import { useTheme } from './ThemeContext';
import * as THREE from 'three';
import useWindowDimensions from './utils/UseWindowDimensions';
import { mdiCubeOutline } from '@mdi/js';

const HomeDiv = styled.div`
  ${() => {
    const { theme } = useTheme();
    return `
    background-repeat: no-repeat;
    background-image: linear-gradient(168deg, ${theme.background}, ${theme.strongHighlight});
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    z-index: -5;
  `;
  }}
`;

const Canvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  // z-index: -1;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  padding-bottom: 5rem;
  z-index: 5;
`;

const Layout = props => {
  const dimensions = useWindowDimensions();
  const { theme } = useTheme();
  // === THREE.JS CODE START ===
  useEffect(() => {
    var mouse = new THREE.Vector2(0, 0);
    document.onmousemove = event => {
      mouse.x = (event.clientX / dimensions.width) * 2 - 1;
      mouse.y = -(event.clientY / dimensions.height) * 2 + 1;
    };

    var loader = new THREE.TextureLoader();
    var cubes = [];
    var scene = new THREE.Scene();
    loader.load('/eye2.jpeg', texture => {
      texture.offset = new THREE.Vector2(0, 0);
      var geometry = new THREE.SphereGeometry(0.5, 15, 15);
      geometry.rotateX(Math.PI / 2);

      geometry.rotateY((Math.PI * 3) / 2);
      // geometry.rotateZ(Math.PI / 2);

      var material = new THREE.MeshBasicMaterial({ map: texture });
      // var material = new THREE.MeshBasicMaterial({ color: theme.strongHighlight });
      for (let i = 0; i < 10; i++) {
        var cube = new THREE.Mesh(geometry, material);
        cube.userData = {
          v: {
            x: (Math.random() % 0.1) - 0.05,
            y: (Math.random() % 0.1) - 0.05,
            z: 0,
          },
          t: {
            x: 1,
            y: 1,
            z: 1,
          },
        };
        cubes.push(cube);
        scene.add(cube);
      }
    });

    var camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('canvas').appendChild(renderer.domElement);
    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var geometry = new THREE.SphereGeometry(0.5, 10, 10);

    // var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
    // cubes.forEach(cube => {
    //   scene.add(cube);
    // });
    console.log(scene);

    camera.position.z = 5;

    var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
    var raycaster = new THREE.Raycaster();
    var intersectPoint = new THREE.Vector3();

    var animate = function () {
      var width = dimensions.width,
        height = dimensions.height;
      var widthHalf = width / 2,
        heightHalf = height / 2;
      if (renderer.width !== dimensions.width || renderer.height !== dimensions.height) {
        renderer.setSize(dimensions.width, dimensions.height);
      }
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, intersectPoint);
      requestAnimationFrame(animate);

      cubes.forEach((cube, index) => {
        cube.position.x += cube.userData.v.x;
        cube.position.y += cube.userData.v.y;

        // if (mx && my) {
        //   cube.userData.t.x += (mx - cube.userData.t.x) * 0.2;
        //   cube.userData.t.y += (-my - cube.userData.t.y) * 0.2;
        //   // cube.userData.t.z = camera.position.z;
        //   // console.log(cube.userData.t);
        //   // var target = new THREE.Vector3(cube.userData.t.x, cube.userData.t.y, 0);
        //   // if (index === 1) {
        //   //   console.log(target);
        //   // }
        //   // target.project(camera);
        //   // if (index === 1) {
        //   //   console.log(target);
        //   // }
        //   // if (target.x) {
        //   // if (mx - widthHalf >= 0) {
        //   cube.lookAt(cube.userData.t.x, cube.userData.t.y, 9);
        // } else {
        // cube.lookAt(cube.userData.t.x + widthHalf, cube.userData.t.y, 0);
        // }
        // }
        // }
        // cube.lookAt(0, 0, 0);
        // if (cube.position.x > 0) {
        //   cube.lookAt(widthHalf, 0, 0);
        // }
        cube.lookAt(intersectPoint.x, intersectPoint.y, intersectPoint.z);

        var pos = cube.position.clone();

        pos.project(camera);
        pos.x = pos.x * widthHalf + widthHalf;
        pos.y = -(pos.y * heightHalf) + heightHalf;

        if (pos.x > width || pos.x < 0) {
          cube.userData.v.x *= -1;
        }
        if (pos.y > height || pos.y < 0) {
          cube.userData.v.y *= -1;
        }
      });
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      // if (cube.position.z > 1 || cube.position.z < -2) {
      //   velocity.z *= -1;
      // }

      renderer.render(scene, camera);
    };
    animate();
  }, [dimensions, theme.strongHighlight]);

  return (
    <HomeDiv>
      <Head>
        <title>Patrick DeVries</title>
      </Head>
      <MainNavigation />
      <Canvas id="canvas" />
      <Body>{props.children}</Body>
    </HomeDiv>
  );
};

export default Layout;
//
