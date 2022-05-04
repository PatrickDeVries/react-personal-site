import React from 'react'
import { CircleDiv, CircleUnderlay, CircleWrapper } from './style'

const Circle: React.FC = () => {
  return (
    <CircleWrapper>
      <CircleUnderlay />
      <CircleDiv />
    </CircleWrapper>
  )
}

export default Circle
