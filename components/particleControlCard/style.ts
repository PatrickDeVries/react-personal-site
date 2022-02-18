import styled from 'styled-components'
import { MOBILE } from '../../styles/mediaQueries'

export const ControlCard = styled.div<{ controlsOpen?: boolean }>`
  background-color: ${({ theme }) => theme.backgroundHighlight}77;
  z-index: 1;
  border-radius: 0.5rem;
  padding: ${({ controlsOpen }) => (controlsOpen ? '1rem' : '0')};
  overflow-y: ${({ controlsOpen }) => (controlsOpen ? 'auto' : 'hidden')};

  flex: ${({ controlsOpen }) => (controlsOpen ? '1' : '0')};
  width: 100%;
  transition: all 0.25s ease;
  ${({ controlsOpen }) =>
    !controlsOpen &&
    `
    pointer-events: none;
    pointer: unset;
  `};
`

export const ControlRows = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
    width: calc(33% - 0.5rem);
  }
  padding: 1rem 0;
  gap: 1rem;

  > div:nth-last-child(3),
  > div:last-child {
    * {
      font-size: 1rem;
    }
  }

  ${MOBILE} {
    > div {
      width: calc(50% - 0.5rem);
    }
    > div:nth-last-child(2) {
      order: 9;
    }
    > div:last-child {
      order: 8;
    }
  }
`

export const ColorInput = styled.input`
  background-color: ${({ theme }) => theme.strongHighlight};
  border: 1px solid ${({ theme }) => theme.secondary};
  cursor: pointer;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
  ${MOBILE} {
    button {
      width: 100%;
      justify-content: center;
    }
  }
`
