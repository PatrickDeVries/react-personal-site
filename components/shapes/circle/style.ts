import styled from 'styled-components'

export const CircleWrapper = styled.div`
  font-size: 50px;
  position: relative;
  height: 1em;
  aspect-ratio: 1;
`

export const CircleDiv = styled.div`
  position: absolute;

  height: 100%;
  aspect-ratio: 1;
  background-color: white;
  border: 0.05em solid #14005c;
  border-radius: 50%;
`

export const CircleUnderlay = styled(CircleDiv)`
  top: 30%;
  background-image: conic-gradient(cyan, pink, yellow, lime);
`
