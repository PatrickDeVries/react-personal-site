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
    const particleCount = 5000;
    const particles = new THREE.BufferGeometry();
    const pMaterial = new THREE.PointsMaterial({
      color: theme.secondary,
      map: new THREE.TextureLoader().load('/particle.png'),
      blending: THREE.AdditiveBlending,
      // transparent: true,
    });

    const positions = [];
    for (let i = 0; i < particleCount; i++) {
      positions.push(
        Math.random() * 500 - 250,
        Math.random() * 500 - 250,
        Math.random() * 500 - 250,
      );
    }
    particles.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));

    const particleSystem = new THREE.Points(particles, pMaterial);
    particleSystem.sortParticles = true;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('canvas').appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: theme.strongHighlight });
    // var cubes = [];
    // for (let i = 0; i < 10; i++) {
    //   var cube = new THREE.Mesh(geometry, material);
    //   cube.userData = {
    //     v: {
    //       x: (Math.random() % 0.1) - 0.05,
    //       y: (Math.random() % 0.2) - 0.1,
    //       z: (Math.random() % 0.2) - 0.1,
    //     },
    //   };
    //   cubes.push(cube);
    //   scene.add(cube);
    // }
    camera.position.z = 5;
    scene.add(particleSystem);

    var animate = function () {
      particleSystem.rotation.y += 0.0005;
      particleSystem.material.color.set(theme.secondary);

      var width = dimensions.width,
        height = dimensions.height;
      var widthHalf = width / 2,
        heightHalf = height / 2;
      if (renderer.width !== dimensions.width || renderer.height !== dimensions.height) {
        renderer.setSize(dimensions.width, dimensions.height);
      }

      // cubes.forEach(cube => {
      //   cube.material.color.set(theme.strongHighlight);
      //   cube.position.x += cube.userData.v.x;
      //   cube.position.y += cube.userData.v.y;
      //   cube.lookAt(0, 0, 0);

      //   var pos = cube.position.clone();

      //   pos.project(camera);
      //   pos.x = pos.x * widthHalf + widthHalf;
      //   pos.y = -(pos.y * heightHalf) + heightHalf;

      //   if (pos.x > width || pos.x < 0) {
      //     cube.userData.v.x *= -1;
      //   }
      //   if (pos.y > height || pos.y < 0) {
      //     cube.userData.v.y *= -1;
      //   }
      // });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  }, [dimensions, theme]);

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
