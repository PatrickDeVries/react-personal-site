import React from 'react'
import { Bar1, Bar2, Bar3, BarsWrapper, Underlay1, Underlay2, Underlay3 } from './style'

const Bars: React.FC = () => {
  return (
    <BarsWrapper>
      <Underlay1 />
      <Bar1 />
      <Underlay2 />
      <Bar2 />
      <Underlay3 />
      <Bar3 />
    </BarsWrapper>
  )
}

export default Bars
