import { Tag, Text, variants } from '@headstorm/foundry-react-ui'
import { mdiOpenInNew } from '@mdi/js'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { workItem } from '../../resources/myWork'
import { DESKTOP, MOBILE, SMALL_MOBILE } from '../../styles/mediaQueries'
import { useTheme } from '../ThemeContext'

const StyledCard = styled.div`
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
  outline: 1px solid ${({ theme }) => theme.secondary};
`

const BodySection = styled.div`
  display: flex;
  flex-direction: row;
  ${SMALL_MOBILE} {
    flex-direction: column;
    align-items: center;
  }
  width: 100%;
`

const ScalingImg = styled.img`
  display: block;
  max-width: 40%;
  object-fit: cover;
  padding: 1rem;
`

const BodyText = styled(Text.Container)`
  margin: 1rem;
  text-align: justify;
  text-justify: inter-word;
`

const TagSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  flex-direction: row;
  width: 100%;
  margin-left: auto;
  bottom: 1rem;
`

interface WorkCardProps {
  item: workItem
}

const WorkCard = ({ item }: WorkCardProps) => {
  const { theme } = useTheme()
  return (
    <StyledCard>
      {/* <Card */}
      {/* StyledContainer={StyledCard} */}
      {/* header={
        <Link href={item?.page || item?.href} passHref={true}>
          <a>
            <Text size="1.25rem" color={theme.primary} iconSuffix={mdiOpenInNew}>
              {item.header}
            </Text>
          </a>
        </Link>
      } */}
      {/* footer={
        <TagSection>
          {item.tags.map(tagText => (
            <Tag key={tagText} variant={variants.outline} color={theme.secondary}>
              <Text size="1rem">{tagText}</Text>
            </Tag>
          ))}
        </TagSection>
      }
    > */}
      <div>
        <Link href={item?.page || item?.href} passHref={true}>
          <a>
            <Text size="1.25rem" color={theme.primary} iconSuffix={mdiOpenInNew}>
              {item.header}
            </Text>
          </a>
        </Link>
        <Link href={item?.page || item?.href} passHref={true}>
          <a>
            <BodySection>
              <ScalingImg src={item.image} />
              <Text color={theme.text} StyledContainer={BodyText}>
                {item.description}
              </Text>
            </BodySection>
          </a>
        </Link>
      </div>
      <TagSection>
        {item.tags.map(tagText => (
          <Tag key={tagText} variant={variants.outline} color={theme.secondary}>
            <Text size="1rem">{tagText}</Text>
          </Tag>
        ))}
      </TagSection>
      {/* </Card> */}
    </StyledCard>
  )
}

export default WorkCard
