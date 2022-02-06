import { Button, Card, Label, RangeSlider, Text, TextInput } from '@headstorm/foundry-react-ui'
import React, { useContext } from 'react'
import { BackgroundControlContext } from '../BackgroundControlProvider'
import { useTheme } from '../ThemeContext'
import { ControlCard, ControlRows, Footer } from './style'

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
    color,
    setColor,

    setPositions,
    setVelocities,
    setAngles,
  } = useContext(BackgroundControlContext)

  const { theme } = useTheme()

  return (
    <Card
      header={<Text color={theme.text}>Controls</Text>}
      StyledContainer={ControlCard}
      containerProps={{ controlsOpen: controlsOpen }}
    >
      <ControlRows>
        <Label labelText="Particle count" color="black">
          <RangeSlider
            min={1}
            max={99999}
            values={[{ value: particleCount, label: particleCount }]}
            showDomainLabels
            showHandleLabels
            onDrag={(newVal: number) => {
              setParticleCount(Math.round(newVal))
            }}
          />
        </Label>
        <Label labelText="Base Velocity" color="black">
          <RangeSlider
            min={0}
            max={1}
            values={[{ value: baseV, label: parseFloat(baseV.toFixed(4)) }]}
            showDomainLabels
            showHandleLabels
            onDrag={(newVal: number) => {
              setBaseV(newVal)
            }}
          />
        </Label>
        <Label labelText="Velocity Variance" color="black">
          <RangeSlider
            min={0}
            max={1}
            values={[{ value: vVar, label: parseFloat(vVar.toFixed(4)) }]}
            showDomainLabels
            showHandleLabels
            onDrag={(newVal: number) => {
              setVVar(newVal)
            }}
          />
        </Label>
        <Label labelText="Base Turn Speed" color="black">
          <RangeSlider
            min={0}
            max={parseFloat((Math.PI / 4).toFixed(4))}
            values={[{ value: baseTurnV, label: parseFloat(baseTurnV.toFixed(4)) }]}
            showDomainLabels
            showHandleLabels
            onDrag={(newVal: number) => {
              setBaseTurnV(newVal)
            }}
          />
        </Label>
        <Label labelText="Turn Speed Variance" color="black">
          <RangeSlider
            min={0}
            max={parseFloat((Math.PI / 4).toFixed(4))}
            values={[{ value: turnVar, label: parseFloat(turnVar.toFixed(4)) }]}
            showDomainLabels
            showHandleLabels
            onDrag={(newVal: number) => {
              setTurnVar(newVal)
            }}
          />
        </Label>
        <Label labelText="Free Thinkers (1 per x)" color="black">
          <RangeSlider
            min={0}
            max={particleCount}
            values={[{ value: freeRate, label: freeRate }]}
            showDomainLabels
            showHandleLabels
            onDrag={(newVal: number) => {
              setFreeRate(Math.round(newVal))
            }}
          />
        </Label>
      </ControlRows>
      <Footer>
        <Label labelText="Color" color="black">
          <TextInput maxLength={7} value={color} onChange={event => setColor(event.target.value)} />
        </Label>
        <Button
          color={theme.primary}
          onClick={() => {
            setPositions([])
            setVelocities([])
            setAngles([])
          }}
        >
          Reset Particles
        </Button>
      </Footer>
    </Card>
  )
}

export default ParticleControlCard
