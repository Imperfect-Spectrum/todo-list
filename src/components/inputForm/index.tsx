import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hook';
import { RootState } from '../../store';
import { addTodo } from '../../store/todoSlice';

const Container = styled.form`
  display: flex;
  gap: 1em;
  margin: 1em auto 0 auto;
  padding-left: 20px;
  padding-right: 20px;
`;
export function InputForm() {
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState('');
  const sortValue = useAppSelector((state: RootState) => state.sorts.sortValue);

  const addNewTask = (e: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addTodo({
        id: new Date().getTime(),
        text: info,
        completed: false,
        deleted: false,
        sort: sortValue,
      })
    );
    setInfo('');
  };
  const style = {
    width: 500,
    backgroundColor: { xs: 'secondary.light', sm: '#ffffff' },
    boxShadow: 6,
  };
  return (
    <div>
      <Container onSubmit={addNewTask}>
        <TextField
          sx={{
            ...style,
            '& .MuiFilledInput-input': { color: 'black' },
          }}
          value={info}
          id="standard-basic"
          label="Filled"
          variant="filled"
          onChange={(e) => {
            setInfo(e.target.value);
          }}
        />

        <Button
          variant="contained"
          size="large"
          onClick={addNewTask}
          sx={{
            width: 300,
          }}
        >
          Submit
        </Button>
      </Container>
    </div>
  );
}
