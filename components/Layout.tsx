import React, { useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { MainNavigation } from '.';
import { useTheme } from './ThemeContext';
import * as THREE from 'three';
import useWindowDimensions from './utils/UseWindowDimensions';
import { Router, useRouter } from 'next/dist/client/router';

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
  const { asPath } = useRouter();

  // === THREE.JS CODE START ===
  useEffect(() => {
    var mouse = new THREE.Vector2(0, 0);
    document.onmousemove = event => {
      mouse.x = (event.clientX / dimensions.width) * 2 - 1;
      mouse.y = -(event.clientY / dimensions.height) * 2 + 1;
    };
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

    camera.position.z = 5;
    scene.add(particleSystem);

    const clock = new THREE.Clock();

    var animate = function () {
      const time = clock.getElapsedTime();
      particleSystem.rotation.y = 0.025 * time;
      particleSystem.rotation.x = 0.01 * time;

      if (mouse.x > -250 && asPath === '/') {
        particleSystem.rotation.y = mouse.x + time * 0.025;
        particleSystem.rotation.x = -mouse.y + time * 0.01;
      }
      particleSystem.material.color.set(theme.secondary);

      if (renderer.width !== dimensions.width || renderer.height !== dimensions.height) {
        renderer.setSize(dimensions.width, dimensions.height);
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  }, [asPath, dimensions, theme]);

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
