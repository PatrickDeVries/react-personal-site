import Link from 'next/link';
import { Text } from '@headstorm/foundry-react-ui';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import * as THREE from 'three';
import useWindowDimensions from '../components/utils/UseWindowDimensions';

const GreetingBlock = styled.div`
  ${() => {
    const { theme } = useTheme();
    return `
      margin-top: 100%;
      filter: drop-shadow(0 0 4rem ${theme.primary});`;
  }}
`;

const IntroText = styled(Text.Container)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  text-align: center;
`;

const CenteredA = styled.a`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

export default function Home() {
  const dimensions = useWindowDimensions();

  const { theme } = useTheme();
  const [xVelocity, setxVelocity] = React.useState(0.01);
  const [yVelocity, setyVelocity] = React.useState(0.01);

  // === THREE.JS CODE START ===
  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('canvas').appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    var width = dimensions.width,
      height = dimensions.height;
    var widthHalf = width / 2,
      heightHalf = height / 2;

    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.position.x += xVelocity;
      var pos = cube.position.clone();
      pos.project(camera);
      pos.x = pos.x * widthHalf + widthHalf;
      pos.y = -(pos.y * heightHalf) + heightHalf;
      if (pos.x > widthHalf) {
        setxVelocity(-0.01);
      }
      if (cube.position.x < 0) {
        setxVelocity(0.01);
      }
      renderer.render(scene, camera);
    };
    animate();
  });

  return (
    <>
      <GreetingBlock>
        <Text color={theme.text} StyledContainer={IntroText} size="2rem">
          Welcome to my website
        </Text>
        <Link href="/work" passHref={true}>
          <CenteredA>
            <Text color={theme.primary} StyledContainer={IntroText}>
              Check out my projects
            </Text>
          </CenteredA>
        </Link>
      </GreetingBlock>
    </>
  );
}
