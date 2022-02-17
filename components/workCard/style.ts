import styled from 'styled-components'
import { DESKTOP, MOBILE, SMALL_MOBILE } from '../../styles/mediaQueries'

export const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.backgroundHighlight};
  width: fit-content;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.5rem;
  padding: 1rem;
  ${DESKTOP} {
    max-width: calc(50% - 1rem);
    min-height: 40vh;
  }
  ${MOBILE} {
    max-width: 100%;
  }
  border: 1px solid ${({ theme }) => theme.secondary};
`

export const HeaderText = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.primary};
`

export const BodySection = styled.div`
  display: flex;
  flex-direction: row;
  ${SMALL_MOBILE} {
    flex-direction: column;
    align-items: center;
  }
  width: 100%;
`

export const ScalingImg = styled.img`
  display: block;
  max-width: 40%;
  object-fit: cover;
  padding: 1rem;
`

export const BodyText = styled.p`
  margin: 1rem;
  color: ${({ theme }) => theme.text};
`

export const TagSection = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  gap: 1rem;
  width: 100%;
  margin-left: auto;
`

export const Tag = styled.p`
  color: ${({ theme }) => theme.secondary};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0;
  flex-basis: 30%;
  flex-grow: 1;
`
