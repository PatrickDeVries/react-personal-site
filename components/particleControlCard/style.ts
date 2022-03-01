import styled from 'styled-components'
import { DESKTOP, MOBILE } from '../../styles/mediaQueries'

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
    padding: 0.5rem;
    * {
      font-size: 1rem;
    }
  }

  ${MOBILE} {
    > div {
      width: calc(50% - 0.5rem);
    }
  }
  ${DESKTOP} {
    > div:last-child {
      display: none;
    }
  }
`

export const ColorInput = styled.input`
  background-color: ${({ theme }) => theme.strongHighlight};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;
  cursor: pointer;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
  div {
    display: flex;
    * {
      font-size: 1rem;
    }
  }

  ${MOBILE} {
    > button {
      width: 100%;
      justify-content: center;
    }
    > div {
      display: none;
    }
  }
`
