import styled from 'styled-components';
import { InputForm } from './components/inputForm';
import { ControlRadio } from './components/form-control';
import { NewListAdd } from './components/new-list-add';
import { Posts } from './components/todoposts/posts';
import { BasicSelect } from './components/todoposts/basic-select';
import { useAppSelector } from './hook';
import { RootState } from './store';

const MainContainer = styled.div`
  display: flex;
  margin: 15px auto 15px auto;
  padding: 20px;
  background-color: #ada3a3;
  width: 100%;
  min-height: 500px;
  max-height: 100%;
  border-radius: 30px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  @media only screen and (min-width: 1058px) {
    width: 50%;
  }
`;
const LeftContainer = styled.div`
  background-color: #c0d3b6;
  padding: 15px;
  width: 30%;
  min-height: 500px;
  max-height: 100%;
  border-radius: 30px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  margin-right: 15px;
`;
const RigthContainer = styled.div`
  padding-bottom: 20px;
  background-color: #c0d3b6;
  width: 70%;
  min-height: 500px;
  max-height: 100%;
  border-radius: 30px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
`;

function App() {
  const selectValue = useAppSelector((state: RootState) => state.setSelect.selectValue);
  const sortValue = useAppSelector((state: RootState) => state.sorts.sortValue);
  return (
    <MainContainer>
      <LeftContainer>
        <BasicSelect />
        <ControlRadio />
        <NewListAdd />
      </LeftContainer>

      <RigthContainer>
        {selectValue === 'All' && sortValue ? <InputForm /> : null}
        <Posts />
      </RigthContainer>
    </MainContainer>
  );
}

export default App;
