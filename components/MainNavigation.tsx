import { Text } from '@headstorm/foundry-react-ui';
import styled from 'styled-components';
import myColors from '../styles/myColors';

const NavDiv = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
//   background-color: ${myColors.background};
  color: white;
`;

const Header = styled.div`
  left: auto;
  margin-left: 1rem;
`;

const MainNavigation = () => {
  return (
    <NavDiv>
      <Header>
        <Text>Patrick DeVries</Text>
      </Header>
    </NavDiv>
  );
};

export default MainNavigation;
