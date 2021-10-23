import React, { useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { MainNavigation } from '.';
import { useTheme } from './ThemeContext';
import * as THREE from 'three';
import useWindowDimensions from './utils/UseWindowDimensions';

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
  height: fit-content;
  padding-bottom: 5rem;
  z-index: 5;
`;

const Layout = props => {
  const dimensions = useWindowDimensions();
  const { theme } = useTheme();
  // === THREE.JS CODE START ===
  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('canvas').appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: theme.strongHighlight });
    var cubes = [];
    for (let i = 0; i < 10; i++) {
      var cube = new THREE.Mesh(geometry, material);
      cube.userData = {
        v: {
          x: (Math.random() % 0.1) - 0.05,
          y: (Math.random() % 0.2) - 0.1,
          z: (Math.random() % 0.2) - 0.1,
        },
      };
      cubes.push(cube);
      console.log(cube);
      scene.add(cube);
    }
    camera.position.z = 5;

    var animate = function () {
      var width = dimensions.width,
        height = dimensions.height;
      var widthHalf = width / 2,
        heightHalf = height / 2;
      if (renderer.width !== dimensions.width || renderer.height !== dimensions.height) {
        renderer.setSize(dimensions.width, dimensions.height);
      }

      requestAnimationFrame(animate);

      cubes.forEach(cube => {
        cube.position.x += cube.userData.v.x;
        cube.position.y += cube.userData.v.y;
        cube.lookAt(0, 0, 0);
        // cube.position.z += velocity.z;

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
