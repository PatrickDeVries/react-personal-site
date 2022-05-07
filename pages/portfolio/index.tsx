import { Text } from '@headstorm/foundry-react-ui'
import React from 'react'
import styled from 'styled-components'
import WorkCard from '../../components/workCard'
import { useTheme } from '../../providers/ThemeProvider'
import myWork from '../../resources/myWork'
import { MOBILE } from '../../styles/mediaQueries'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`

const SectionHeader = styled(Text.Container)`
  width: 100%;
  padding: 2rem 0 1rem;

  display: block;

  font-size: 16px;
  text-transform: uppercase;
`

const WorkItems = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;

  ${MOBILE} {
    align-items: center;
    justify-content: center;
  }
`

const ReadmeStats = styled.img`
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.secondary};
  width: calc(50% - 1rem);
  ${MOBILE} {
    width: 100%;
  }
`

const colorArg = (color: string) => color.replace('#', '')

const Portfolio: React.FC = () => {
  const { theme } = useTheme()
  return (
    <Wrapper>
      {Object.keys(myWork).map(key => (
        <section key={`${key}-section`}>
          <Text
            key={`${key}-header`}
            color={theme.primary}
            size="1.25rem"
            StyledContainer={SectionHeader}
          >
            {key}:
          </Text>
          <WorkItems key={`${key}-work-items`}>
            {myWork[key].map(item => (
              <WorkCard key={item.header} item={item} />
            ))}
            {key === 'Github Contributions' && (
              <ReadmeStats
                src={`https://github-readme-stats.vercel.app/api?username=patrickdevries&count_private=true&show_icons=true&title_color=${colorArg(
                  theme.primary,
                )}&text_color=${colorArg(theme.text)}&icon_color=${colorArg(
                  theme.secondary,
                )}&bg_color=${colorArg(theme.backgroundHighlight)}&hide_border=true&hide=issues`}
                alt="GitHub user stats for patrickdevries"
              />
            )}
          </WorkItems>
        </section>
      ))}
    </Wrapper>
  )
}

export default Portfolio
