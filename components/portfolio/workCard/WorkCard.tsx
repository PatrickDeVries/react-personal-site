import Link from 'next/link'
import React from 'react'
import { WorkItem } from '../types'
import { BodySection, BodyText, HeaderText, ScalingImg, StyledCard, Tag, TagSection } from './style'
interface WorkCardProps {
  item: WorkItem
}

const WorkCard = ({ item }: WorkCardProps) => {
  return (
    <StyledCard>
      <div>
        <Link href={item?.page || item?.href} passHref={true}>
          <a>
            <HeaderText>{item.header}</HeaderText>
          </a>
        </Link>
        <Link href={item?.page || item?.href} passHref={true}>
          <a>
            <BodySection>
              <ScalingImg src={item.image} />
              <BodyText>{item.description}</BodyText>
            </BodySection>
          </a>
        </Link>
      </div>
      <TagSection>
        {item.tags.map(tagText => (
          <Tag key={tagText}>{tagText}</Tag>
        ))}
      </TagSection>
    </StyledCard>
  )
}

export default WorkCard
