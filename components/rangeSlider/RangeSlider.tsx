import React, { useCallback } from 'react'
import { Header, Label, Labels, RangeWrapper, SliderWrapper, Wrapper } from './style'

type Props = {
  label: string
  value: number
  onChange: (newVal: number) => void
  min: number
  max: number
  step?: number
  labels?: { min?: string; max?: string }
  title?: string
}

const RangeSlider: React.FC<Props> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  labels,
  title,
}) => {
  const getReturnVal = useCallback(
    (val: number) => {
      if (val < min) return min
      if (val > max) return max
      return Math.ceil(val / step) * step
    },
    [max, min, step],
  )

  const changeHandler = useCallback(
    e => onChange(getReturnVal(Number(e.target.value))),
    [getReturnVal, onChange],
  )

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
          onChange={changeHandler}
          title={title}
        />
      </Header>
      <SliderWrapper>
        <Labels>
          <Label>{labels?.min ?? min}</Label>
          <Label>{labels?.max ?? max}</Label>
        </Labels>
        <RangeWrapper min={min} max={max} value={value}>
          <div></div>
          <input
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onInput={changeHandler}
            id={label}
            title={title}
          />
        </RangeWrapper>
      </SliderWrapper>
    </Wrapper>
  )
}

export default RangeSlider
