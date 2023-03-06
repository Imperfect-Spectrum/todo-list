import Button from '@mui/material/Button';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box/Box';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import { addNewList } from '../../store/sortSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { RootState } from '../../store';

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
  top: '70%',
  left: '50%',
  transform: 'translate(-50%, -200%)',
  bgcolor: 'red',
  border: '2px solid #000',
  boxShadow: 24,
};

const styleTextField = {
  backgroundColor: { xs: '#ffffff', sm: '#ffffff' },
  boxShadow: 6,
  width: '100%',
  marginBottom: '20px',
};

export function NewListAdd() {
  const [openModal, setOpenModal] = useState(false);
  const [openTwoModal, setOpenTwoModal] = useState(false);
  const handleOpenClose = () => setOpenModal(!openModal);
  const handleOpenClosetwoModal = () => setOpenTwoModal(!openTwoModal);

  const [sortName, setSortName] = useState('');
  const dispatch = useAppDispatch();
  const sortList = useAppSelector((state: RootState) => state.sorts.sortList);

  const addNew = (e: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const index = sortList.findIndex((obj: { sortName: string }) => obj.sortName === sortName);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    index === -1 ? dispatch(addNewList({ sortName })) : setOpenTwoModal(!openTwoModal);
    handleOpenClose();
    setSortName('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onClick={handleOpenClose}
        variant="outlined"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', width: '70%' }}
      >
        + Add list
      </Button>
      <Modal open={openModal} onClose={handleOpenClose}>
        <Box sx={styleModal}>
          <form onSubmit={addNew}>
            <TextField
              label="Enter a list name"
              sx={{
                ...styleTextField,
                '& .MuiFilledInput-input': { color: 'black' },
              }}
              value={sortName}
              id="standard-basic"
              variant="filled"
              onChange={(e) => {
                setSortName(e.target.value);
              }}
            />

            <Button
              variant="contained"
              size="large"
              onClick={addNew}
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
          <Alert
            variant="filled"
            severity="warning"
            sx={{ fontSize: '1.5rem', padding: '2rem' }}
            onClick={handleOpenClosetwoModal}
          >
            You can &apos;t create two categories of the same category!
          </Alert>
        </Box>
      </Modal>
    </Box>
  );
}
