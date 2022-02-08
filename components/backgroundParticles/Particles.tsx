import { useFrame, useThree } from '@react-three/fiber'
import React, { Dispatch, MutableRefObject, SetStateAction, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { BufferAttribute, BufferGeometry, Points, ShaderMaterial } from 'three'
import './particlematerial'
import { fragment, vertex } from './particlematerial'

type Props = {
  particleCount: number
  baseV: number
  vVar: number
  baseTurnV: number
  turnVar: number
  freeRate: number
  colorA: string
  colorB: string

  positions: number[]
  setPositions: Dispatch<SetStateAction<number[]>>
  velocities: number[]
  setVelocities: Dispatch<SetStateAction<number[]>>
  angles: number[]
  setAngles: Dispatch<SetStateAction<number[]>>

  particles: MutableRefObject<BufferGeometry>
}

const GetShaderMaterial: React.FC<{
  colorA: string
  colorB: string
  bboxMin: number
  bboxMax: number
}> = props => {
  const ref = useRef<ShaderMaterial>()
  const uniforms = useMemo(
    () =>
      THREE.UniformsUtils.merge([
        {
          colorA: { value: new THREE.Color(props.colorA) },
          colorB: { value: new THREE.Color(props.colorB) },
          bboxMin: { value: props.bboxMin },
          bboxMax: { value: props.bboxMax },
        },
      ]),
    [],
  )

  // this works, but is not dependent on props
  useFrame(state => {
    ref.current.uniforms.colorA.value = new THREE.Color(props.colorA)
    ref.current.uniforms.colorB.value = new THREE.Color(props.colorB)
    ref.current.uniforms.bboxMin.value = props.bboxMin
    ref.current.uniforms.bboxMax.value = props.bboxMax
  })

  return (
    <shaderMaterial
      ref={ref}
      attach="material"
      uniforms={uniforms}
      vertexShader={vertex}
      fragmentShader={fragment}
    />
  )
}

const Particles: React.FC<Props> = ({
  particleCount,
  baseV,
  vVar: vVariance,
  baseTurnV: baseTurnSpeed,
  turnVar: turnVariance,
  freeRate,
  colorA,
  colorB,

  positions,
  setPositions,
  velocities,
  setVelocities,
  angles,
  setAngles,

  particles,
}) => {
  const viewport = useThree(state => state.viewport)
  const pointRef = useRef<Points>()
  const sizes = []

  for (let i = 0; i < 999999; i++) {
    sizes.push(5)
  }

  if (positions.length < particleCount) {
    const newPositions = []
    const newVelocities = []
    const newAngles = []
    for (let i = 0; i < 999999; i++) {
      newPositions.push(
        Math.random() * viewport.width - viewport.width / 2,
        Math.random() * viewport.height - viewport.height / 2,
        0,
      )
      newVelocities.push(Math.random(), Math.random(), 0)
      let newA = Math.random() * 2 * Math.PI
      if (
        newA < 0.01 ||
        newA > Math.PI - 0.01 ||
        (newA < Math.PI / 2 + 0.01 && newA > Math.PI / 2 - 0.01) ||
        (newA < Math.PI / 4 + 0.01 && newA > Math.PI / 4 - 0.01) ||
        (newA < (Math.PI * 3) / 4 + 0.01 && newA > (Math.PI * 3) / 4 - 0.01)
      ) {
        newA += 0.03
      }
      newAngles.push(newA)
    }

    setPositions(newPositions)
    setVelocities(newVelocities)
    setAngles(newAngles)
  }

  const pi2 = Math.PI * 2

  const updatePositions = () => {
    if (particles.current) {
      const pps: BufferAttribute = particles.current['attributes']['position'] as BufferAttribute
      const pvs: BufferAttribute = particles.current['attributes']['velocity'] as BufferAttribute
      const pas: BufferAttribute = particles.current['attributes']['angle'] as BufferAttribute

      for (let i = 0, l = particleCount; i < l; i++) {
        let angle = pas.getX(i)
        let v = pvs.getX(i) * vVariance + baseV
        let turnV = pvs.getY(i) * turnVariance + baseTurnSpeed

        pps.setXY(i, pps.getX(i) + v * Math.cos(angle), pps.getY(i) + v * Math.sin(angle))

        if (pps.getX(i) > viewport.width / 2 || pps.getX(i) < -viewport.width / 2) {
          pas.setX(i, Math.atan2(v * Math.sin(angle), -v * Math.cos(angle)))
          // reset if it has somehow escaped
          if (
            pps.getX(i) + v * Math.cos(pas.getX(i)) > viewport.width / 2 ||
            pps.getX(i) + v * Math.cos(pas.getX(i)) < -viewport.width / 2
          ) {
            pps.setXY(i, 0, 0)
          }
        } else if (pps.getY(i) > viewport.height / 2 || pps.getY(i) < -viewport.height / 2) {
          pas.setX(i, Math.atan2(-v * Math.sin(angle), v * Math.cos(angle)))
          // reset if it has somehow escaped
          if (
            pps.getY(i) + v * Math.sin(pas.getX(i)) > viewport.height / 2 ||
            pps.getY(i) + v * Math.sin(pas.getX(i)) < -viewport.height / 2
          ) {
            pps.setXY(i, 0, 0)
          }
        } else if (i % freeRate !== 0 && i > 0) {
          let goalAngle = Math.atan2(pps.getY(i - 1) - pps.getY(i), pps.getX(i - 1) - pps.getX(i))
          let newAngle =
            ((goalAngle - angle + Math.PI) % pi2) - Math.PI < turnV
              ? goalAngle
              : goalAngle > (angle + Math.PI) % pi2
              ? angle - turnV
              : angle + turnV
          pas.setX(i, newAngle % pi2)
        }
      }
    }
  }

  useFrame(() => {
    updatePositions()
    particles.current['attributes']['position'].needsUpdate = true
  })

  return (
    <points ref={pointRef}>
      <bufferGeometry ref={particles} attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={particleCount}
          array={new Float32Array(positions)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'velocity']}
          count={particleCount}
          array={new Float32Array(velocities)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'angle']}
          count={particleCount}
          array={new Float32Array(angles)}
          itemSize={1}
        />
        <bufferAttribute
          attachObject={['attributes', 'size']}
          count={particleCount}
          array={new Float32Array(sizes)}
          itemSize={1}
        />
      </bufferGeometry>
      <GetShaderMaterial colorA={colorA} colorB={colorB} bboxMin={-1} bboxMax={1} />
    </points>
  )
}

export default Particles
