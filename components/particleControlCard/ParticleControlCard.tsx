import { Button, Label, Text } from '@headstorm/foundry-react-ui'
import { useRouter } from 'next/dist/client/router'
import React, { useContext } from 'react'
import { BackgroundControlContext } from '../../providers/BackgroundControlProvider'
import { useTheme } from '../../providers/ThemeProvider'
import RangeSlider from '../rangeSlider'
import { ColorInput, ControlCard, ControlRows, Footer } from './style'

const ParticleControlCard: React.FC = () => {
  const {
    controlsOpen,

    particleCount,
    setParticleCount,
    baseV,
    setBaseV,
    vVar,
    setVVar,
    baseTurnV,
    setBaseTurnV,
    turnVar,
    setTurnVar,
    freeRate,
    setFreeRate,
    mouseSize,
    setMouseSize,
    colorA,
    setColorA,
    colorB,
    setColorB,

    setPositions,
    setVelocities,
    setAngles,

    resetSettings,
  } = useContext(BackgroundControlContext)

  const { theme } = useTheme()
  const router = useRouter()

  return (
    <>
      <ControlCard controlsOpen={controlsOpen}>
        <Text color={theme.text}>Controls</Text>
        <ControlRows>
          <RangeSlider
            value={particleCount}
            min={1}
            max={99999}
            labels
            onChange={newVal => setParticleCount(newVal)}
            label="Particle count"
          />
          <RangeSlider
            value={parseFloat(baseV.toFixed(4))}
            min={0}
            max={1}
            step={0.0001}
            labels
            onChange={newVal => setBaseV(newVal)}
            label="Base velocity"
          />
          <RangeSlider
            value={parseFloat(vVar.toFixed(4))}
            min={0}
            max={1}
            step={0.0001}
            labels
            onChange={newVal => setVVar(newVal)}
            label="Velocity variance"
          />
          <RangeSlider
            value={parseFloat(baseTurnV.toFixed(5))}
            min={0}
            max={parseFloat((Math.PI / 4).toFixed(5))}
            step={0.00001}
            labels
            onChange={newVal => setBaseTurnV(newVal)}
            label="Base turn speed"
          />
          <RangeSlider
            value={parseFloat(turnVar.toFixed(5))}
            min={0}
            max={parseFloat((Math.PI / 4).toFixed(5))}
            step={0.00001}
            labels
            onChange={newVal => setTurnVar(newVal)}
            label="Turn speed variance"
          />
          <RangeSlider
            value={freeRate}
            min={1}
            max={particleCount}
            step={1}
            labels
            onChange={newVal => setFreeRate(newVal)}
            label="Free thinkers (1 per x)"
          />
          <Label labelText="Left color" color={theme.text}>
            <ColorInput
              type="color"
              value={colorA}
              onChange={event => {
                setColorA(event.target.value)
                router.push('/background')
              }}
            />
          </Label>
          <RangeSlider
            value={mouseSize}
            min={0}
            max={5}
            step={0.01}
            labels
            onChange={newVal => setMouseSize(newVal)}
            label="Mouse social distancing"
          />
          <Label labelText="Right color" color={theme.text}>
            <ColorInput
              type="color"
              value={colorB}
              onChange={event => setColorB(event.target.value)}
            />
          </Label>
        </ControlRows>
        <Footer>
          <Button
            color={theme.danger}
            onClick={() => {
              resetSettings()
            }}
          >
            Restore settings to Default
          </Button>
          <Button
            color={theme.danger}
            onClick={() => {
              setPositions([])
              setVelocities([])
              setAngles([])
            }}
          >
            Reset Particle Locations
          </Button>
        </Footer>
      </ControlCard>
    </>
  )
}

export default ParticleControlCard
