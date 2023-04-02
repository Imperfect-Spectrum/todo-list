import { Alert, Box, Button, createTheme, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { RootState } from '../../store';
import { addTodo } from '../../store/todoSlice';

const styleModal = {
  position: 'absolute',
  top: '70%',
  left: '50%',
  transform: 'translate(-50%, -200%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  margin: 'auto',
};

const styleModalTwo = {
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -200%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10%',
  boxShadow: 24,
  margin: 'auto',
};
const theme = createTheme();

export function InputForm() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenClose = () => setOpenModal(!openModal);
  const [openTwoModal, setOpenTwoModal] = useState(false);
  const handleOpenClosetwoModal = () => setOpenTwoModal(!openTwoModal);
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState('');
  const sortValue = useAppSelector((state: RootState) => state.sorts.sortValue);

  const addNewTask = (e: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (info === '') {
      setOpenModal(!openModal);
      setOpenTwoModal(!openTwoModal);
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
      setOpenModal(!openModal);
    }
    setInfo('');
  };
  const styleTextField = {
    backgroundColor: { xs: '#ffffff', sm: '#ffffff' },
    boxShadow: 6,
    width: '100%',
    marginBottom: '20px',
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 6,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Button
          size="large"
          variant="contained"
          sx={{
            width: '80%',
            [theme.breakpoints.up('lg')]: {
              width: 1000,
            },
          }}
          onClick={() => setOpenModal(!openModal)}
        >
          Add new task
        </Button>
      </Box>

      <Modal open={openModal} onClose={handleOpenClose}>
        <Box sx={styleModal}>
          <form onSubmit={addNewTask}>
            <TextField
              sx={{
                ...styleTextField,
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
                width: '100%',
                boxShadow: 6,
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal open={openTwoModal} onClose={handleOpenClosetwoModal}>
        <Box sx={styleModalTwo}>
          <Alert variant="filled" severity="warning" sx={{ fontSize: '1.5rem' }} onClick={handleOpenClosetwoModal}>
            You can &apos;t create an empty task!
          </Alert>
        </Box>
      </Modal>
    </>
  );
}
