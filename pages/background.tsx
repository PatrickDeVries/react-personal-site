import dynamic from 'next/dynamic'
import { useContext } from 'react'
import styled from 'styled-components'
import { MOBILE } from '../components/ theme/mediaQueries'
import { BackgroundControlContext } from '../components/particleControlCard/provider'
const ParticleControlCard = dynamic(() => import('../components/particleControlCard'), {
  ssr: false,
}) // turn off SSR for particle control card which for some reason cannot be SSRed

const Wrapper = styled.div<{ firstHit?: boolean }>`
  position: fixed;
  top: 2rem;
  right: 3.5rem;
  ${MOBILE} {
    right: 6rem;
  }
  ${({ firstHit }) => !firstHit && 'transform: translateY(-100vh);'}

  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  background-color: ${({ theme }) => theme.background}77;
  border: 1px ${({ theme }) => theme.secondary} solid;

  transition: transform 0.25s ease;
`

const GearIndicator = styled.p`
  text-align: right;
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  /* z-index: 2; */
`

const Instructions = styled.p`
  text-align: right;
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  /* z-index: 2; */
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
