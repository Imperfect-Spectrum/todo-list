import Button from '@mui/material/Button';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { addNewList } from '../../store/sortSlice';
import { useAppDispatch } from '../../hook';

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

export function NewListAdd() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sortName, setSortName] = useState('');
  const dispatch = useAppDispatch();

  const addNew = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(addNewList({ sortName }));
    setOpen(false);
    setSortName('');
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" fullWidth>
        + Add list
      </Button>
      <Modal open={open} onClose={handleClose}>
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
              }}
            >
              Submit
            </Button>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
