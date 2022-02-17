import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { BufferGeometry } from 'three'
import { darkColors } from '../styles/myColors'
import { useTheme } from './ThemeProvider'

const DEFAULT_SETTINGS = {
  particleCount: 20000,
  baseV: 0.05,
  vVar: 0.003,
  baseTurnV: 0.03 * Math.PI,
  turnVar: 0.03 * Math.PI,
  freeRate: 200,
  mouseSize: 0.5,
}

export type Mouse = {
  x: number
  y: number
}

export type BackgroundControl = {
  firstHit: boolean
  setFirstHit: (newVal: boolean) => void
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
  mouseSize: number
  setMouseSize: (newVal: number) => void
  colorA: string
  setColorA: (newVal: string) => void
  colorB: string
  setColorB: (newVal: string) => void

  positions: number[]
  setPositions: Dispatch<SetStateAction<number[]>>
  velocities: number[]
  setVelocities: Dispatch<SetStateAction<number[]>>
  angles: number[]
  setAngles: Dispatch<SetStateAction<number[]>>

  particles: MutableRefObject<BufferGeometry>

  updateState: () => void
  resetSettings: () => void
}

export const BackgroundControlContext = createContext<BackgroundControl | null>(null)

export const BackgroundControlProvider: React.FC = ({ children }) => {
  const { theme } = useTheme()
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const [firstHit, setFirstHit] = useState<boolean>(true)
  const [controlsOpen, setControlsOpen] = useState<boolean>(false)

  const [particleCount, setParticleCount] = useState<number>(DEFAULT_SETTINGS.particleCount)
  const [baseV, setBaseV] = useState<number>(DEFAULT_SETTINGS.baseV)
  const [vVar, setVVar] = useState<number>(DEFAULT_SETTINGS.vVar)
  const [baseTurnV, setBaseTurnV] = useState<number>(DEFAULT_SETTINGS.baseV)
  const [turnVar, setTurnVar] = useState<number>(DEFAULT_SETTINGS.baseTurnV)
  const [freeRate, setFreeRate] = useState<number>(DEFAULT_SETTINGS.freeRate)
  const [mouseSize, setMouseSize] = useState<number>(DEFAULT_SETTINGS.mouseSize)
  const [colorA, setColorA] = useState<string>(theme.primary)
  const [colorB, setColorB] = useState<string>(theme.secondary)

  const [positions, setPositions] = useState<number[]>([])
  const [velocities, setVelocities] = useState<number[]>([])
  const [angles, setAngles] = useState<number[]>([])

  const particles = useRef<BufferGeometry>()

  useEffect(() => {
    const {
      particleCount: particleCountStore,
      baseV: baseVStore,
      vVar: vVarStore,
      baseTurnV: baseTurnVStore,
      turnVar: turnVarStore,
      freeRate: freeRateStore,
      mouseSize: mouseSizeStore,
      colorA: colorAStore,
      colorB: colorBStore,
    } = JSON.parse(localStorage.getItem('background-settings')) ?? {}
    setParticleCount(particleCountStore ?? DEFAULT_SETTINGS.particleCount)
    setBaseV(baseVStore ?? DEFAULT_SETTINGS.baseV)
    setVVar(vVarStore ?? DEFAULT_SETTINGS.vVar)
    setBaseTurnV(baseTurnVStore ?? DEFAULT_SETTINGS.baseTurnV)
    setTurnVar(turnVarStore ?? DEFAULT_SETTINGS.turnVar)
    setFreeRate(freeRateStore ?? DEFAULT_SETTINGS.freeRate)
    setMouseSize(mouseSizeStore ?? DEFAULT_SETTINGS.mouseSize)
    setColorA(colorAStore ?? darkColors.primary)
    setColorB(colorBStore ?? darkColors.secondary)
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(
        'background-settings',
        JSON.stringify({
          particleCount,
          baseV,
          vVar,
          baseTurnV,
          turnVar,
          freeRate,
          mouseSize,
          colorA,
          colorB,
        }),
      )
    }
  }, [
    baseTurnV,
    baseV,
    colorA,
    colorB,
    freeRate,
    isInitialized,
    mouseSize,
    particleCount,
    turnVar,
    vVar,
  ])

  const updateState = () => {
    if (particles.current) {
      setPositions(particles.current.attributes.position.array as number[])
      setVelocities(particles.current.attributes.velocity.array as number[])
      setAngles(particles.current.attributes.angle.array as number[])
    }
  }

  const resetSettings = () => {
    updateState()
    setParticleCount(DEFAULT_SETTINGS.particleCount)
    setBaseV(DEFAULT_SETTINGS.baseV)
    setVVar(DEFAULT_SETTINGS.vVar)
    setBaseTurnV(DEFAULT_SETTINGS.baseTurnV)
    setTurnVar(DEFAULT_SETTINGS.turnVar)
    setFreeRate(DEFAULT_SETTINGS.freeRate)
    setMouseSize(DEFAULT_SETTINGS.mouseSize)
    setColorA(theme.primary)
    setColorB(theme.secondary)
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
        firstHit,
        setFirstHit,
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
        mouseSize,
        setMouseSize: setWrapper<number>(setMouseSize),
        colorA,
        setColorA: setWrapper<string>(setColorA),
        colorB,
        setColorB: setWrapper<string>(setColorB),

        positions,
        setPositions,
        velocities,
        setVelocities,
        angles,
        setAngles,

        particles,

        updateState,
        resetSettings,
      }}
    >
      {children}
    </BackgroundControlContext.Provider>
  )
}