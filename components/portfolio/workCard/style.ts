import styled from 'styled-components'
import { DESKTOP, SMALL_MOBILE } from '../../ theme/mediaQueries'

export const StyledCard = styled.div`
  align-self: stretch;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;

  background-color: ${({ theme }) => theme.backgroundHighlight};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 0.5rem;

  ${DESKTOP} {
    max-width: calc(50% - 1rem);
  }

  > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  a {
    text-decoration: none;
  }
`

export const HeaderText = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.secondary};
`

export const BodySection = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  gap: 1rem;

  font-size: 14px;

  ${SMALL_MOBILE} {
    flex-direction: column;
    align-items: center;
  }
  padding: 1rem;
`

export const ScalingImg = styled.img`
  display: block;
  max-height: 20vh;
  max-width: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`

export const BodyText = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`

export const TagSection = styled.div`
  width: 100%;

  display: flex;
  flex-flow: row wrap-reverse;
  justify-content: flex-start;
  gap: 0.5rem;
`

export const Tag = styled.p`
  padding: 0.5rem;
  margin: 0;

  color: ${({ theme }) => theme.secondary};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 0.25rem;
`
