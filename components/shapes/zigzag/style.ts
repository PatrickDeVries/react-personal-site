import styled from 'styled-components'

export const ZigZagWrapper = styled.div`
  font-size: 50px;
  position: relative;
  height: 1em;
  width: 2em;

  * {
    box-sizing: content-box;
  }
`

export const Bar1 = styled.div`
  position: absolute;
  top: 75%;
  width: 0.5em;
  height: 0.25em;
  border: 0.05em solid #14005c;
  background-color: white;
  border-right: none;
`

export const Bar2 = styled.div`
  position: absolute;
  top: 50%;
  left: calc(12.5% + 0.05em);
  width: 0.25em;
  height: 0.5em;
  border: 0.05em solid #14005c;
  border-left: none;
  background-color: white;

  &::after {
    content: '';
    position: absolute;
    left: -0.05em;

    width: 0.25em;
    height: 0.25em;

    border-left: 0.05em solid #14005c;
  }
`

export const Bar3 = styled.div`
  position: absolute;
  top: 30%;
  left: 12.5%;
  width: 0.5em;
  height: 0.25em;
  border: 0.05em solid #14005c;
  border-bottom: none;
  background-color: white;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    width: 0.3em;
    height: 0.25em;

    border-bottom: 0.05em solid #14005c;
  }
`

export const Bar4 = styled(Bar2)`
  left: 35%;
  top: calc(10% - 0.05em);
`
