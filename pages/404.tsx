import Link from 'next/link'
import styled from 'styled-components'

const GreetingBlock = styled.div<{ controlsOpen?: boolean }>`
  flex: 1;
  align-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  filter: drop-shadow(0 0 4rem ${({ theme }) => theme.primary});
`

const Warning = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 2rem;

  > b {
    color: ${({ theme }) => theme.secondary};
    font-weight: 500;
  }
`

const CenteredA = styled.a`
  text-align: center;
  font-size: 1.25rem;
  padding: 1rem;
  color: ${({ theme }) => theme.text};

  border: 2px ${({ theme }) => theme.text} solid;
`

const FourOFour: React.FC = () => {
  return (
    <>
      <GreetingBlock>
        <Warning>404</Warning>
        <Warning>Not sure what you&apos;re looking for, but it&apos;s not here</Warning>
        <Link href="/" passHref={true}>
          <CenteredA>Back to safety</CenteredA>
        </Link>
      </GreetingBlock>
    </>
  )
}

export default FourOFour
