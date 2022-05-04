import { lighten } from 'polished'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  gap: 2rem;

  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`

export const LeftSection = styled.div`
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const RightSection = styled.div`
  flex: 1;
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

export const PlayerWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  > div:nth-child(n + 1) {
    margin-top: 1.5rem;
  }
  align-items: center;
`

export const BallsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

export const PoolBall = styled.div<{ num: number; sunk?: boolean }>`
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ num, sunk }) =>
    sunk ? lighten(0.25, BALL_COLORS[(num - 1) % 8]) : BALL_COLORS[(num - 1) % 8]};
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

  ${({ num, theme }) =>
    num > 8 &&
    css`
      ::before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 15%;

        width: 100%;
        height: 70%;

        border-top: 1px solid ${theme.text};
        border-bottom: 1px solid ${theme.text};
        box-shadow: 0 0 0 1rem white;
      }
    `}
  ::after {
    content: '';
    position: absolute;
    box-sizing: border-box;
    top: 0;

    width: 2rem;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.text};
  }

  > div {
    width: 50%;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: white;
    color: black;
    font-size: 10px;
    border: 1px solid ${({ theme }) => theme.text};

    display: flex;
    place-content: center;
    align-items: center;
  }
`
