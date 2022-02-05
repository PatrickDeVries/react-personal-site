import { extend, ReactThreeFiber } from '@react-three/fiber'
import * as THREE from 'three'

export class ParticleMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      uniforms: {
        colorB: { value: new THREE.Color(0x03ffff) },
        colorA: { value: new THREE.Color(0xd705fc) },
      },
      vertexShader: `
        varying vec3 vUv;
        attribute float size;

        void main() {
            vUv = position;
            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition;    
            gl_PointSize = size;  
        }`,
      fragmentShader: `
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.x*0.3), 1.0);
      }
      `,
    })
  }
}

extend({ ParticleMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleMaterial: ReactThreeFiber.Object3DNode<ParticleMaterial, typeof ParticleMaterial>
    }
  }
}