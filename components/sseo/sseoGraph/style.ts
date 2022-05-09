import styled, { css } from 'styled-components'
import { MOBILE } from '../../ theme/mediaQueries'
import { BallType, BallTypeCombo } from '../types'

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  width: min(75vh, 90vw);
  aspect-ratio: 1;
`

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
  font-size: 1.4rem;
  ${MOBILE} {
    font-size: 1rem;
  }

  ${({ ballType }) =>
    (ballType === BallType.Even || ballType === BallType.Odd) &&
    css`
      writing-mode: vertical-lr;
      transform: scale(-1, -1);
      padding-block-end: 0;
    `}
`

export const GridCell = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 1.4rem;

  border: 1px solid ${({ theme }) => theme.secondary};

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`

export const Label = styled.div<{
  location?: BallType | BallTypeCombo | 'hidden'
  index?: -1 | 0 | 1
  winner?: boolean
}>`
  position: absolute;
  width: 50%;
  height: 50%;

  top: ${({ location, index }) =>
    location === BallType.Solid || location === BallType.Stripe
      ? '25%'
      : location === BallType.Odd
      ? '50%'
      : location === BallType.Even
      ? '0'
      : location === BallTypeCombo.SolidEven || location === BallTypeCombo.StripeEven
      ? index === 0
        ? '-12.5%'
        : index === 1
        ? '12.5%'
        : '0'
      : index === 0
      ? '37.5%'
      : index === 1
      ? '62.5%'
      : '50%'};

  left: ${({ location }) =>
    location === BallType.Even || location === BallType.Odd
      ? '25%'
      : location === BallTypeCombo.StripeEven ||
        location === BallTypeCombo.StripeOdd ||
        location === BallType.Stripe
      ? '50%'
      : '0'};

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s ease-in-out;

  > span {
    padding: 1rem;
    max-width: calc(100% - 2px);

    background-color: ${({ theme }) => theme.backgroundHighlight};
    text-align: center;
    font-size: 1.8rem;
    ${({ winner, theme }) =>
      winner &&
      css`
        color: ${theme.primary};
      `}

    ${MOBILE} {
      font-size: 1.2rem;
    }
  }

  ${({ location }) =>
    location === 'hidden' &&
    css`
      display: none;
    `}
`
