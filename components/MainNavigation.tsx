import { Text, variants, Tag } from '@headstorm/foundry-react-ui';
import styled from 'styled-components';
import myColors from '../styles/myColors';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const NavDiv = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  background-color: #0006;
  color: white;
  border-bottom: 1px solid ${myColors.primary};
`;

const Header = styled.div`
  left: auto;
  margin-left: 2rem;
  filter: drop-shadow(0 0 0.75rem ${myColors.secondary});
`;

const NavSection = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: stretch;
`;

const NavTag = styled(Tag.Container)`
  outline: 1px solid ${myColors.primary};
  height: 100%;
  border-radius: 0 0 0 0;
`;

const Name = styled.span`
  white-space: nowrap;
`;

const pages = {
  Home: '/',
  'My Work': '/work',
  'Contact Me': '/contact',
};

const MainNavigation = () => {
  const router = useRouter();

  console.log(router.pathname);
  return (
    <NavDiv>
      <Header>
        <Text size="1.5rem" color={myColors.primary}>
          <Name>Patrick DeVries</Name>
        </Text>
      </Header>
      <NavSection>
        {Object.keys(pages).map(label => (
          <Link href={pages[label]} key={label}>
            <a>
              <Tag
                color={
                  router.pathname === pages[label] ? myColors.strongHighlight : myColors.background
                }
                variant={variants.fill}
                StyledContainer={NavTag}
              >
                {label}
              </Tag>
            </a>
          </Link>
        ))}
      </NavSection>
    </NavDiv>
  );
};

export default MainNavigation;
