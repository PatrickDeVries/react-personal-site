import { createContext, Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react'
import { BufferGeometry } from 'three'

export type BackgroundControl = {
  controlsOpen: boolean
  setControlsOpen: (newVal: boolean) => void

  particleCount: number
  setParticleCount: (newVal: number) => void
  baseV: number
  setBaseV: (newVal: number) => void
  vVar: number
  setVVar: (newVal: number) => void
  baseTurnV: number
  setBaseTurnV: (newVal: number) => void
  turnVar: number
  setTurnVar: (newVal: number) => void
  freeRate: number
  setFreeRate: (newVal: number) => void
  color: string
  setColor: (newVal: string) => void

  positions: number[]
  setPositions: Dispatch<SetStateAction<number[]>>
  velocities: number[]
  setVelocities: Dispatch<SetStateAction<number[]>>
  angles: number[]
  setAngles: Dispatch<SetStateAction<number[]>>

  particles: MutableRefObject<BufferGeometry>

  updateState: () => void
}

export const BackgroundControlContext = createContext<BackgroundControl | null>(null)

export const BackgroundControlProvider: React.FC = ({ children }) => {
  const [controlsOpen, setControlsOpen] = useState<boolean>(false)

  const [particleCount, setParticleCount] = useState<number>(20000)
  const [baseV, setBaseV] = useState<number>(0.05)
  const [vVar, setVVar] = useState<number>(0.003)
  const [baseTurnV, setBaseTurnV] = useState<number>(0.03 * Math.PI)
  const [turnVar, setTurnVar] = useState<number>(0.03 * Math.PI)
  const [freeRate, setFreeRate] = useState<number>(200)
  const [color, setColor] = useState<string>('#114455')

  const [positions, setPositions] = useState<number[]>([])
  const [velocities, setVelocities] = useState<number[]>([])
  const [angles, setAngles] = useState<number[]>([])

  const particles = useRef<BufferGeometry>()

  const updateState = () => {
    if (particles.current) {
      setPositions(particles.current.attributes.position.array as number[])
      setVelocities(particles.current.attributes.velocity.array as number[])
      setAngles(particles.current.attributes.angle.array as number[])
    }
  }

  function setWrapper<T>(setter: Dispatch<SetStateAction<T>>): (newVal: T) => void {
    return (newVal: T) => {
      updateState()
      setter(newVal)
    }
  }

  return (
    <BackgroundControlContext.Provider
      value={{
        controlsOpen,
        setControlsOpen: setWrapper<boolean>(setControlsOpen),

        particleCount,
        setParticleCount: setWrapper<number>(setParticleCount),
        baseV,
        setBaseV: setWrapper<number>(setBaseV),
        vVar,
        setVVar: setWrapper<number>(setVVar),
        baseTurnV,
        setBaseTurnV: setWrapper<number>(setBaseTurnV),
        turnVar,
        setTurnVar: setWrapper<number>(setTurnVar),
        freeRate,
        setFreeRate: setWrapper<number>(setFreeRate),
        color,
        setColor: setWrapper<string>(setColor),

        positions,
        setPositions,
        velocities,
        setVelocities,
        angles,
        setAngles,

        particles,

        updateState,
      }}
    >
      {children}
    </BackgroundControlContext.Provider>
  )
}

// export const useParticleControls = (): BackgroundControl => {
//   const {context} = useContext(BackgroundControlContext)

//   return { ...context }
// }
