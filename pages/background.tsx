import { useContext } from 'react'
import styled from 'styled-components'
import ParticleControlCard from '../components/particleControlCard'
import { BackgroundControlContext } from '../providers/BackgroundControlProvider'
import { MOBILE } from '../styles/mediaQueries'

const Wrapper = styled.div<{ firstHit?: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  top: 2rem;
  right: 3.5rem;
  ${MOBILE} {
    right: 6rem;
  }
  background-color: ${({ theme }) => theme.background}77;
  border: 1px ${({ theme }) => theme.secondary} solid;
  padding: 1rem;

  ${({ firstHit }) => !firstHit && 'transform: translateY(-100vh);'}
  transition: transform .25s ease;
`

const GearIndicator = styled.p`
  text-align: right;
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  z-index: 2;
`

const Instructions = styled.p`
  text-align: right;
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  z-index: 2;
`

const Background: React.FC = () => {
  const { firstHit } = useContext(BackgroundControlContext)
  return (
    <>
      <ParticleControlCard />
      <Wrapper firstHit={firstHit}>
        <GearIndicator>^</GearIndicator>
        <Instructions>Click the gear to open the particle settings </Instructions>
      </Wrapper>
    </>
  )
}

export default Background
