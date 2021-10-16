import { Text } from '@headstorm/foundry-react-ui';
import styled from 'styled-components';
import myColors from '../styles/myColors';

const NavDiv = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  color: white;
`;

const Header = styled.div`
  left: auto;
  margin-left: 1rem;
`;

const Name = styled.span`
//   font-family: neon;
`;

const MainNavigation = () => {
  return (
    <NavDiv>
      <Header>
        <Text size="1.5rem" color={myColors.secondary}>
          <Name>Patrick DeVries</Name>
        </Text>
      </Header>
    </NavDiv>
  );
};

export default MainNavigation;
