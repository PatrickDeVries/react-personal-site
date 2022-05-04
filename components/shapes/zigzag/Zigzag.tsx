import React from 'react'
import { Bar1, Bar2, Bar3, Bar4, ZigZagWrapper } from './style'

const Zigzag: React.FC = () => {
  return (
    <ZigZagWrapper>
      <Bar1 />
      <Bar2 />
      <Bar3 />
      <Bar4 />
    </ZigZagWrapper>
  )
}

export default Zigzag
