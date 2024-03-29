import { Button, Label, Text } from '@headstorm/foundry-react-ui'
import { useRouter } from 'next/dist/client/router'
import React, { useContext } from 'react'
import { useTheme } from 'styled-components'
import RangeSlider from '../rangeSlider'
import { BackgroundControlContext, MouseShapes } from './provider'
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
    freeThinkers: freeThinkers,
    setFreeThinkers: setFreeThinkers,
    mouseSize,
    setMouseSize,
    mouseShape,
    setMouseShape,

    colorA,
    setColorA,
    colorB,
    setColorB,

    setPositions,
    setVelocities,
    setAngles,

    resetSettings,
  } = useContext(BackgroundControlContext)

  const theme = useTheme()
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
            onChange={newVal => {
              setParticleCount(newVal)
              freeThinkers > newVal && setFreeThinkers(newVal)
            }}
            label="Particle count"
          />
          <RangeSlider
            value={parseFloat(baseV.toFixed(4))}
            min={0}
            max={1}
            step={0.0001}
            onChange={newVal => setBaseV(newVal)}
            label="Base velocity"
          />
          <RangeSlider
            value={parseFloat(vVar.toFixed(4))}
            min={0}
            max={1}
            step={0.0001}
            onChange={newVal => setVVar(newVal)}
            label="Velocity variance"
          />
          <RangeSlider
            value={parseFloat(baseTurnV.toFixed(5))}
            min={0}
            max={parseFloat((Math.PI / 4).toFixed(5))}
            step={0.00001}
            onChange={newVal => setBaseTurnV(newVal)}
            label="Base turn speed"
            labels={{ max: 'π/4' }}
          />
          <RangeSlider
            value={parseFloat(turnVar.toFixed(5))}
            min={0}
            max={parseFloat((Math.PI / 4).toFixed(5))}
            step={0.00001}
            onChange={newVal => setTurnVar(newVal)}
            label="Turn speed variance"
            labels={{ max: 'π/4' }}
          />
          <RangeSlider
            value={freeThinkers}
            min={0}
            max={particleCount}
            step={1}
            onChange={newVal => setFreeThinkers(newVal)}
            label="Free thinkers"
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
            onChange={newVal => setMouseSize(newVal)}
            label="Mouse social distancing"
            title="Press '-' to shrink, '=' to grow"
          />
          <Label labelText="Right color" color={theme.text}>
            <ColorInput
              type="color"
              value={colorB}
              onChange={event => setColorB(event.target.value)}
            />
          </Label>
          <Label labelText="Mouse shape" color={theme.text}>
            <select value={mouseShape} onChange={e => setMouseShape(MouseShapes[e.target.value])}>
              {Object.keys(MouseShapes).map(shape => (
                <option key={shape} value={shape}>
                  {shape}
                </option>
              ))}
            </select>
          </Label>
        </ControlRows>
        <Footer>
          <Button
            color={theme.focus}
            onClick={() => {
              resetSettings()
            }}
          >
            Restore settings to Default
          </Button>
          <Label labelText="Mouse shape" color={theme.text}>
            <select value={mouseShape} onChange={e => setMouseShape(MouseShapes[e.target.value])}>
              {Object.keys(MouseShapes).map(shape => (
                <option key={shape} value={shape}>
                  {shape}
                </option>
              ))}
            </select>
          </Label>
          <Button
            color={theme.focus}
            onClick={() => {
              setPositions([])
              setVelocities([])
              setAngles([])
            }}
            containerProps={{ title: 'This will randomise the positions of all particles' }}
          >
            Reset Particle Locations
          </Button>
        </Footer>
      </ControlCard>
    </>
  )
}

export default ParticleControlCard
