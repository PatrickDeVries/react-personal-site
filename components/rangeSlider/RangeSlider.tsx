import React from 'react'
import { Header, Label, Labels, RangeWrapper, SliderWrapper, Wrapper } from './style'

type Props = {
  label: string
  value: number
  onChange: (newVal: number) => void
  min: number
  max: number
  step?: number
  labels?: boolean
}

const RangeSlider: React.FC<Props> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  labels = false,
}) => {
  const getReturnVal = (val: number) => {
    if (val < min) return min
    if (val > max) return max
    return Math.ceil(val / step) * step
  }

  return (
    <Wrapper>
      <Header>
        {label}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e => onChange(getReturnVal(Number(e.target.value)))}
        />
      </Header>
      <SliderWrapper>
        {labels && (
          <Labels>
            <Label>{min}</Label>
            <Label>{max}</Label>
          </Labels>
        )}
        <RangeWrapper min={min} max={max} value={value}>
          <div></div>
          <input
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={e => onChange(getReturnVal(Number(e.target.value)))}
            id={label}
          />
        </RangeWrapper>
      </SliderWrapper>
    </Wrapper>
  )
}

export default RangeSlider
