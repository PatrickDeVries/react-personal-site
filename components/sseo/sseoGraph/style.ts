import styled, { css } from 'styled-components'
import { BallType, BallTypeCombo } from '../types'

export const Wrapper = styled.div``

export const GraphLabels = styled.div`
  display: grid;

  grid-template: auto 1fr 1fr / auto 1fr 1fr;
  grid-template-areas:
    '. ${BallType.Solid} ${BallType.Stripe}'
    '${BallType.Even} g g'
    '${BallType.Odd} g g';
`

export const GraphBody = styled.div`
  position: relative;
  grid-area: g;

  background-color: ${({ theme }) => theme.backgroundHighlight};

  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
`

export const GridHeader = styled.div<{ ballType: BallType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: ${({ ballType }) => ballType};
  padding: 1rem;

  text-align: center;
  font-size: 16px;
  ${({ ballType }) =>
    (ballType === BallType.Even || ballType === BallType.Odd) &&
    css`
      writing-mode: vertical-lr;
      transform: scale(-1, -1);
    `}
`

export const GridCell = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 16px;

  border: 1px solid ${({ theme }) => theme.text};

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`

export const Label = styled.div<{ location?: BallType | BallTypeCombo | 'hidden'; index?: 0 | 1 }>`
  position: absolute;
  width: 50%;
  height: 50%;

  ${({ location, index }) =>
    [BallType.Solid, BallType.Stripe].includes(location)
      ? css`
          top: 25%;
        `
      : location === BallType.Odd
      ? css`
          top: 50%;
        `
      : location === BallType.Even
      ? css`
          top: 0;
        `
      : [BallTypeCombo.SolidEven, BallTypeCombo.StripeEven].includes(location)
      ? index === 0
        ? css`
            top: -12.5%;
          `
        : css`
            top: 12.5%;
          `
      : index === 0
      ? css`
          top: 37.5%;
        `
      : css`
          top: 62.5%;
        `}

  ${({ location }) =>
    [BallType.Even, BallType.Odd].includes(location)
      ? css`
          left: 25%;
        `
      : [BallTypeCombo.StripeEven, BallTypeCombo.StripeOdd, BallType.Stripe].includes(location)
      ? css`
          left: 50%;
        `
      : css`
          left: 0;
        `}

    
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s ease-in-out;

  > span {
    padding: 1rem;

    background-color: ${({ theme }) => theme.backgroundHighlight};
    text-align: center;
    font-size: 20px;
  }

  ${({ location }) =>
    location === 'hidden' &&
    css`
      display: none;
    `}
`
