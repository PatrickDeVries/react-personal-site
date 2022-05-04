import React from 'react'
import { TriangleDiv, TriangleUnderlay, TriangleWrapper } from './style'

const Triangle: React.FC = () => {
  return (
    <TriangleWrapper>
      <TriangleUnderlay />
      <TriangleDiv />
    </TriangleWrapper>
  )
}

export default Triangle
