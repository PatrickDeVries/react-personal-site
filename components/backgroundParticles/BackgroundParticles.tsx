import { Canvas } from '@react-three/fiber'
import { useRouter } from 'next/dist/client/router'
import React, { useContext } from 'react'
import { BackgroundControlContext } from '../../providers/BackgroundControlProvider'
import './particlematerial'
import Particles from './Particles'
import { BgCanvas } from './style'

type Props = {
  top: number
}

const BackgroundParticles: React.FC<Props> = ({ top }) => {
  const {
    particleCount,
    baseV,
    vVar,
    baseTurnV,
    turnVar,
    freeThinkers: freeThinkers,
    mouseSize,
    mouseShape,

    colorA,
    colorB,

    positions,
    setPositions,
    velocities,
    setVelocities,
    angles,
    setAngles,

    particles,
  } = useContext(BackgroundControlContext)
  const router = useRouter()

  return (
    <BgCanvas id="bgCanvas">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Particles
          particleCount={particleCount}
          baseV={baseV}
          vVar={vVar}
          baseTurnV={baseTurnV}
          turnVar={turnVar}
          freeThinkers={freeThinkers}
          positions={positions}
          setPositions={setPositions}
          velocities={velocities}
          setVelocities={setVelocities}
          angles={angles}
          setAngles={setAngles}
          particles={particles}
          colorA={colorA}
          colorB={colorB}
          mouseSize={mouseSize}
          mouseShape={mouseShape}
          top={top}
          pathname={router?.pathname}
        />
      </Canvas>
    </BgCanvas>
  )
}

export default BackgroundParticles
