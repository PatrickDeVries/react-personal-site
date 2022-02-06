import { Text } from '@headstorm/foundry-react-ui'
import React from 'react'
import styled from 'styled-components'
import { useTheme } from '../components/ThemeContext'
import WorkCard from '../components/WorkCard'
import myWork from '../resources/myWork'
import { MOBILE } from '../styles/mediaQueries'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`

const SectionHeader = styled(Text.Container)`
  display: block;
  width: 100%;
  text-align: left;
  padding: 2rem 0 1rem;
`

const WorkItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  ${MOBILE} {
    align-items: center;
    justify-content: center;
  }
  gap: 2rem;
  width: 100%;
`

const Work = () => {
  const { theme } = useTheme()
  return (
    <Wrapper>
      {Object.keys(myWork).map(key => (
        <>
          <Text
            key={`${key}-text`}
            color={theme.primary}
            size="1.25rem"
            StyledContainer={SectionHeader}
          >
            {key}:
          </Text>
          <WorkItems key={`${key}-work`}>
            {myWork[key].map(item => (
              <WorkCard key={item.header} item={item} />
            ))}
          </WorkItems>
        </>
      ))}
    </Wrapper>
  )
}

export default Work
