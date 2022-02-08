import { Card } from '@headstorm/foundry-react-ui'
import styled from 'styled-components'
import { MOBILE } from '../../styles/mediaQueries'

export const ControlCard = styled(Card.Container)`
  background-color: ${({ theme }) => theme.backgroundHighlight}77;
  width: 100%;
  z-index: 1;
  height: auto;
  transition: all 0.25s ease;
  flex: ${({ controlsOpen }) => (controlsOpen ? '1' : '0')};
  overflow: hidden;
  ${({ controlsOpen }) =>
    !controlsOpen &&
    `
    pointer-events: none;
    pointer: unset;
  `};
`

export const ControlRows = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  div {
    flex: calc(33% - 1rem);
  }
  padding: 1rem 0;
  gap: 1rem;

  ${MOBILE} {
    div {
      flex: calc(50% - 1rem);
    }
  }

  // Styling of sliders
  label,
  > div > div > div {
    color: ${({ theme }) => theme.text};
  }
  > div > div > div > div,
  div[draggable='false'] {
    background-color: ${({ theme }) => theme.primary};
  }
  div[draggable='false'] > div {
    background-color: ${({ theme }) => theme.backgroundHighlight};
  }
`

export const ColorInput = styled.input`
  width: 10rem;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`
