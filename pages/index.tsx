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
  const [firstRender, setFirstRender] = React.useState(true);
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
  }, [dimensions]);

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
