import { useContext } from 'react'
import styled from 'styled-components'
import { BackgroundControlContext } from '../components/BackgroundControlProvider'
import ParticleControlCard from '../components/particleControlCard'

const GreetingBlock = styled.div<{ controlsOpen?: boolean }>`
  flex: 1;
  align-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  filter: drop-shadow(0 0 4rem ${({ theme }) => theme.primary});
`

const IntroText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 2rem;

  > b {
    color: ${({ theme }) => theme.secondary};
    font-weight: 500;
  }
`

export default function Home() {
  const { firstHit } = useContext(BackgroundControlContext)
  return (
    <>
      <ParticleControlCard />
      {firstHit && (
        <GreetingBlock>
          <IntroText>Click the gear to open the background settings</IntroText>
        </GreetingBlock>
      )}
    </>
  )
}
