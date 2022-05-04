import styled from 'styled-components'

export const BarsWrapper = styled.div`
  position: relative;
  font-size: 50px;
  height: 1em;
  aspect-ratio: 1;
`

export const Bar = styled.div`
  position: absolute;

  height: 20%;
  width: 70%;

  background-color: white;
  border: 0.05em solid #14005c;

  transform-origin: center;
  transform: rotateZ(-30deg);
`

export const Bar1 = styled(Bar)`
  left: 15%;
`
export const Underlay1 = styled(Bar)`
  left: 10%;
  top: 13%;
  background-color: cyan;
`

export const Bar2 = styled(Bar)`
  left: 5%;
  top: 45%;
`

export const Underlay2 = styled(Bar)`
  left: 0;
  top: 58%;
  background-color: yellow;
`

export const Bar3 = styled(Bar)`
  top: 70%;
  left: 30%;
`

export const Underlay3 = styled(Bar)`
  left: 25%;
  top: 83%;
  background-color: lime;
`
