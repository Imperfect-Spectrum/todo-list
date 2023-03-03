import { Alert, Box, Button, Modal, TextField } from '@mui/material';
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
const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -200%)',
  bgcolor: 'red',
  border: '2px solid #000',
  boxShadow: 24,
};

export function InputForm() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenClose = () => setOpenModal(!openModal);
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState('');
  const sortValue = useAppSelector((state: RootState) => state.sorts.sortValue);

  const addNewTask = (e: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (info === '') {
      setOpenModal(!openModal);
    } else {
      dispatch(
        addTodo({
          id: new Date().getTime(),
          text: info,
          completed: false,
          deleted: false,
          sort: sortValue,
        })
      );
    }
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
          label="Enter a task"
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
            boxShadow: 6,
          }}
        >
          Submit
        </Button>
      </Container>
      <Modal open={openModal} onClose={handleOpenClose}>
        <Box sx={styleModal}>
          <Alert
            variant="filled"
            severity="warning"
            sx={{ fontSize: '1.5rem', padding: '2rem' }}
            onClick={handleOpenClose}
          >
            You can &apos;t create an empty to-do!
          </Alert>
        </Box>
      </Modal>
    </div>
  );
}
