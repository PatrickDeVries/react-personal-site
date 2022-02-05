import { Text } from '@headstorm/foundry-react-ui'
import React from 'react'
import styled from 'styled-components'
import { useTheme } from '../components/ThemeContext'
import WorkCard from '../components/WorkCard'
import myWork from '../resources/myWork'

const SectionHeader = styled(Text.Container)`
  display: block;
  width: 100%;
  text-align: left;
  margin-top: 1rem;
  padding: 1rem 0rem 0.5rem 1rem;
`

const WorkItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`

const Work = () => {
  const { theme } = useTheme()
  return (
    <>
      {Object.keys(myWork).map(key => (
        <>
          <Text color={theme.primary} size="1.25rem" StyledContainer={SectionHeader}>
            {key}:
          </Text>
          <WorkItems>
            {myWork[key].map(item => (
              <WorkCard key={item.header} item={item} />
            ))}
          </WorkItems>
        </>
      ))}
    </>
  )
}

export default Work
