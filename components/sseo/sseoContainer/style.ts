import styled, { css } from 'styled-components'
import { MOBILE } from '../../ theme/mediaQueries'

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  ${MOBILE} {
    flex-direction: column;
    align-items: center;
  }
  gap: 2rem;
  padding: 1rem 3rem;
  ${MOBILE} {
    padding: 1rem;
  }
  margin: 0 auto;
  color: ${({ theme }) => theme.text};
`

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
`

export const RightSection = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  * {
  }
`

const BALL_COLORS = [
  '#F6DD4A',
  '#0E348A',
  '#B2342B',
  '#381F74',
  '#E77943',
  '#2F6A50',
  '#611915',
  '#000000',
]

export const Header = styled.header`
  display: flex;
  gap: 1rem;
  align-items: center;
  > button {
    padding: 0.5em 0.75em;
  }
`

export const PlayerWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: flex-end;

  font-size: 1.2rem;

  > label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-indent: 1rem;

    > div {
      display: flex;
      gap: 1rem;
      align-items: center;

      > label {
        width: 19rem;
      }

      > button {
        padding: 0.5em 0.75em;
      }
    }
  }
`

export const BallsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 1.2rem;
`

export const PoolBall = styled.div<{ num: number; sunk?: boolean }>`
  position: relative;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background-color: ${({ num }) => BALL_COLORS[(num - 1) % 8]};
  box-sizing: border-box;

  ${({ sunk }) =>
    !sunk &&
    css`
      cursor: pointer;
    `}

  display: flex;
  place-content: center;
  align-items: center;
  overflow: hidden;

  user-select: none;

  ${({ num }) =>
    num > 8 &&
    css`
      ::before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 15%;

        width: 100%;
        height: 70%;

        border-top: 1px solid black;
        border-bottom: 1px solid black;
        box-shadow: 0 0 0 1rem white;
      }
    `}
  ::after {
    content: '';
    position: absolute;
    box-sizing: border-box;
    top: 0;

    width: 2em;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid black;
  }

  > div {
    width: 50%;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: white;
    color: black;
    font-size: 0.6em;
    border: 1px solid black;

    display: flex;
    place-content: center;
    align-items: center;
  }
`

export const ConfirmQueue = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1.2rem;

  > select {
    padding: 0.75rem 0.5rem;

    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 0.25rem;
    outline: none;

    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.backgroundHighlight};

    &:focus {
      border-color: ${({ theme }) => theme.focus};
    }
  }

  > button {
    padding: 0.75rem 0.5rem;
  }
`
