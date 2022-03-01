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

export type Mouse = {
  x: number
  y: number
}

export enum MouseShapes {
  Circle = 'Circle',
  Square = 'Square',
  Star = 'Star',
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
  freeThinkers: number
  setFreeThinkers: (newVal: number) => void
  mouseSize: number
  setMouseSize: (newVal: number) => void
  mouseShape: MouseShapes
  setMouseShape: (newVal: MouseShapes) => void

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

const DEFAULT_SETTINGS: Pick<
  BackgroundControl,
  | 'particleCount'
  | 'baseV'
  | 'vVar'
  | 'baseTurnV'
  | 'turnVar'
  | 'freeThinkers'
  | 'mouseSize'
  | 'mouseShape'
> = {
  particleCount: 20000,
  baseV: 0.05,
  vVar: 0.003,
  baseTurnV: 0.03 * Math.PI,
  turnVar: 0.03 * Math.PI,
  freeThinkers: 200,
  mouseSize: 1,
  mouseShape: MouseShapes.Circle,
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
  const [freeThinkers, setFreeThinkers] = useState<number>(DEFAULT_SETTINGS.freeThinkers)
  const [mouseSize, setMouseSize] = useState<number>(DEFAULT_SETTINGS.mouseSize)
  const [mouseShape, setMouseShape] = useState<MouseShapes>(DEFAULT_SETTINGS.mouseShape)

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
      freeThinkers: freeThinkersStore,
      mouseSize: mouseSizeStore,
      mouseShape: mouseShapeStore,
      colorA: colorAStore,
      colorB: colorBStore,
    } = JSON.parse(localStorage.getItem('background-settings')) ?? {}
    setParticleCount(particleCountStore ?? DEFAULT_SETTINGS.particleCount)
    setBaseV(baseVStore ?? DEFAULT_SETTINGS.baseV)
    setVVar(vVarStore ?? DEFAULT_SETTINGS.vVar)
    setBaseTurnV(baseTurnVStore ?? DEFAULT_SETTINGS.baseTurnV)
    setTurnVar(turnVarStore ?? DEFAULT_SETTINGS.turnVar)
    setFreeThinkers(freeThinkersStore ?? DEFAULT_SETTINGS.freeThinkers)
    setMouseSize(mouseSizeStore ?? DEFAULT_SETTINGS.mouseSize)
    setMouseShape(mouseShapeStore ?? DEFAULT_SETTINGS.mouseShape)
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
          freeThinkers,
          mouseSize,
          mouseShape,
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
    freeThinkers,
    isInitialized,
    mouseShape,
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
    setFreeThinkers(DEFAULT_SETTINGS.freeThinkers)
    setMouseSize(DEFAULT_SETTINGS.mouseSize)
    setMouseShape(DEFAULT_SETTINGS.mouseShape)

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
        freeThinkers: freeThinkers,
        setFreeThinkers: setWrapper<number>(setFreeThinkers),
        mouseSize,
        setMouseSize: setWrapper<number>(setMouseSize),
        mouseShape,
        setMouseShape: setWrapper<MouseShapes>(setMouseShape),

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
