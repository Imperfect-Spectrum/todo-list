import Button from '@mui/material/Button';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import { addNewList } from '../../store/sortSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { RootState } from '../../store';

const styleModal = {
  position: 'absolute',
  top: '50%',
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
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -200%)',
  bgcolor: 'red',
  border: '2px solid #000',
  boxShadow: 24,
};

export function NewListAdd() {
  const [openModal, setOpenModal] = useState(false);
  const [openTwoModal, setOpenTwoModal] = useState(false);
  const handleOpenClose = () => setOpenModal(!openModal);
  const handleOpenClosetwoModal = () => setOpenTwoModal(!openTwoModal);

  const [sortName, setSortName] = useState('');
  const dispatch = useAppDispatch();
  const sortList = useAppSelector((state: RootState) => state.sorts.sortList);

  const addNew = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const index = sortList.findIndex((obj: { sortName: string }) => obj.sortName === sortName);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    index === -1 ? dispatch(addNewList({ sortName })) : setOpenTwoModal(!openTwoModal);
    handleOpenClose();
    setSortName('');
  };

  return (
    <div>
      <Button onClick={handleOpenClose} variant="outlined" fullWidth sx={{ boxShadow: 6 }}>
        + Add list
      </Button>
      <Modal open={openModal} onClose={handleOpenClose}>
        <Box sx={styleModal}>
          <Container>
            <TextField
              label="Enter a list name"
              variant="outlined"
              value={sortName}
              size="medium"
              sx={{
                width: 300,
                marginBottom: 2,
              }}
              onChange={(e) => {
                setSortName(e.target.value);
              }}
            />

            <Button
              variant="contained"
              size="large"
              onClick={addNew}
              sx={{
                width: 300,
                boxShadow: 6,
              }}
            >
              Submit
            </Button>
          </Container>
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
    </div>
  );
}
