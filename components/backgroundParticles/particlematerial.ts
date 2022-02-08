export const vertex = `
  varying vec3 vUv;
  uniform float bboxMin;
  uniform float bboxMax;
  attribute float size;

  void main() {
    vUv.x = (position.x - bboxMin) / (bboxMax - bboxMin);
      vUv = position;
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition;    
      gl_PointSize = size;  
  }
  `

export const fragment = `
    uniform vec3 colorA; 
    uniform vec3 colorB; 
    varying vec3 vUv;

    void main() {
      gl_FragColor = vec4(mix(colorA, colorB, vUv.x*.1 + .5), 1.0);
    }
  `
