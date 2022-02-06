import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import { BufferAttribute, Points } from 'three'
import './particlematerial'

const Particles = props => {
  const viewport = useThree(state => state.viewport)
  const particles = props.particles
  const pointRef = useRef<Points>()
  const particleCount = props.particleCount
  const baseV = props.baseV
  const vVariance = props.vVar
  const baseTurnSpeed = props.baseTurnV
  const turnVariance = props.turnVar
  const sizes = []
  for (let i = 0; i < 999999; i++) {
    sizes.push(5)
  }

  if (props.positions.length < particleCount) {
    const positions = []
    const velocities = []
    const angles = []
    for (let i = 0; i < 999999; i++) {
      positions.push(
        Math.random() * viewport.width - viewport.width / 2,
        Math.random() * viewport.height - viewport.height / 2,
        0,
      )
      velocities.push(Math.random(), Math.random(), 0)
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
      angles.push(newA)
    }

    props.setPositions(positions)
    props.setVelocities(velocities)
    props.setAngles(angles)
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
        } else if (i % props.freeRate !== 0 && i > 0) {
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
          array={new Float32Array(props.positions)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'velocity']}
          count={particleCount}
          array={new Float32Array(props.velocities)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'angle']}
          count={particleCount}
          array={new Float32Array(props.angles)}
          itemSize={1}
        />
        <bufferAttribute
          attachObject={['attributes', 'size']}
          count={particleCount}
          array={new Float32Array(sizes)}
          itemSize={1}
        />
      </bufferGeometry>
      <particleMaterial />
    </points>
  )
}

export default Particles
