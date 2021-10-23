import { Card, colors, Tag, Text, variants } from '@headstorm/foundry-react-ui';
import React from 'react';
import styled from 'styled-components';
import { workItem } from '../resources/myWork';
import Link from 'next/link';
import { useTheme } from './ThemeContext';

const StyledCard = styled(Card.Container)`
  ${() => {
    const { theme } = useTheme();
    return `
      margin: 1rem;
      background-color: ${theme.backgroundHighlight};
      width: fit-content;
      align-self: stretch;
      @media (min-width: 800px) {
        max-width: 40vw;
        min-height: 40vh;
      }
      @media (max-width: 799px) {
        width: 90vw;
      }
      outline: 2px solid ${theme.strongHighlight};
      `;
  }}
`;

const BodySection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ScalingImg = styled.img`
  display: block;
  max-width: 40%;
  object-fit: cover;
`;

const BodyText = styled(Text.Container)`
  margin: 1rem;
  text-align: justify;
  text-justify: inter-word;
`;

const TagSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  flex-direction: row;
  width: 100%;
  margin-left: auto;
  bottom: 1rem;
`;

interface WorkCardProps {
  item: workItem;
}

const WorkCard = ({ item }: WorkCardProps) => {
  const { theme } = useTheme();

  return (
    <Card
      StyledContainer={StyledCard}
      header={
        <Link href={item?.page || item?.href} passHref={true}>
          <a>
            <Text size="1.25rem" color={theme.primary}>
              {item.header}
            </Text>
          </a>
        </Link>
      }
      footer={
        <TagSection>
          {item.tags.map(tagText => (
            <Tag key={tagText} variant={variants.outline} color={theme.secondary}>
              <Text size="1rem">{tagText}</Text>
            </Tag>
          ))}
        </TagSection>
      }
    >
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
    </Card>
  );
};

export default WorkCard;
