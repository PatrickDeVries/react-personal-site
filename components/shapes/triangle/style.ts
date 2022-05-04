import styled from 'styled-components'

export const TriangleWrapper = styled.div`
  font-size: 50px;
  position: relative;
  height: 1em;
  aspect-ratio: 1;
`

export const TriangleDiv = styled.div`
  position: absolute;

  left: 0;

  height: 0;
  width: 0;
  border-left: 0.5em solid transparent;
  border-right: 0.5em solid transparent;

  border-bottom: 1em solid #14005c;

  &::after {
    content: '';
    position: absolute;
    left: -0.4em;
    top: 0.14em;

    height: 0;
    width: 0;
    border-left: 0.4em solid transparent;
    border-right: 0.4em solid transparent;

    border-bottom: 0.8em solid white;
  }
`

export const TriangleUnderlay = styled(TriangleDiv)`
  top: 0.125em;
  left: 0.2em;
  &::after {
    border-bottom: 0.8em solid pink;
  }
`
