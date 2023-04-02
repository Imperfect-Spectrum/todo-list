import styled from 'styled-components';
import { Typography } from '@mui/material';
import { InputForm } from './components/inputForm';
import { ControlRadio } from './components/form-control';
import { Posts } from './components/todoposts/posts';
import { ButtonSelectGroup } from './components/button-group';
import { NewListAdd } from './components/new-list-add';
import { useAppSelector } from './hook';
import { RootState } from './store';

const MainContainer = styled.div`
  background-image: url('/images/header-4.png');
  background-position: top;
  background-repeat: repeat-x;
  background-size: 100% auto;
  background-color: #f1efef;
  min-height: 1300px;
  max-height: 100%;
  width: 50%;
  min-width: 970px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  @media (max-width: 1016px) {
    background-image: url('/images/header-3.png');
    background-position: top;
    background-repeat: repeat-x;
    background-size: 100% auto;
    width: 100%;
    min-width: auto;
  }
  @media (max-width: 765px) {
    background-image: url('/images/header-2.png');
    background-position: top;
    background-repeat: repeat-x;
    background-size: 100% auto;
  }
  @media (max-width: 507px) {
    background-image: url('/images/header-1.png');
    background-position: top;
    background-repeat: repeat-x;
    background-size: 100% auto;
  }
`;

const BasicSelectContainer = styled.div`
  background-color: #f1f5f9;
  min-height: 100px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 30px;
  margin-top: 4rem;
  padding-top: 10px;
  padding-bottom: 20px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
`;

function App() {
  const sortValue = useAppSelector((state: RootState) => state.sorts.sortValue);
  return (
    <MainContainer>
      <Typography variant="h3" align="center" color="white" sx={{ paddingTop: 5 }}>
        To-do list
      </Typography>
      <BasicSelectContainer>
        <ControlRadio />
        <NewListAdd />
      </BasicSelectContainer>
      <ButtonSelectGroup />
      <Typography variant="h4" align="center" color="#1277d3" sx={{ paddingTop: 1 }}>
        Tasks
      </Typography>
      <Posts />
      {sortValue && sortValue !== 'None' ? <InputForm /> : null}
    </MainContainer>
  );
}

export default App;
