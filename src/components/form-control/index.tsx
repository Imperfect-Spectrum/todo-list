import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { RootState } from '../../store';
import { deleteList, setValueSort } from '../../store/sortSlice';
import { deleteTodoList } from '../../store/todoSlice';

const styleModal = {
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

export function ControlRadio() {
  const dispatch = useAppDispatch();
  const sortList = useAppSelector((state: RootState) => state.sorts.sortList);
  const sortValue = useAppSelector((state: RootState) => state.sorts.sortValue);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenCloseModal = () => setOpenModal(!openModal);

  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(
      setValueSort({
        sortValue: event.target.value,
        sortList: [],
      })
    );
  };

  const buttonClick = () => {
    if (sortValue !== '') {
      dispatch(deleteTodoList(sortValue));
      dispatch(deleteList(sortValue));
    }
    if (sortValue === '') {
      setOpenModal(!openModal);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" color="primary" sx={{ marginBottom: 1 }}>
          Select a category
        </Typography>
        <Box sx={{ width: '70%', display: 'flex' }}>
          <FormControl fullWidth sx={{ marginRight: '15px' }}>
            <InputLabel>Сategory</InputLabel>
            <Select onChange={handleChange} defaultValue="" sx={{ boxShadow: 6 }}>
              <MenuItem>
                <em>None</em>
              </MenuItem>
              {sortList.map((sort) => (
                <MenuItem key={sort.sortName} value={sort.sortName}>
                  <em>{sort.sortName}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={buttonClick}>
            Remove list
          </Button>
        </Box>
      </Box>

      <Modal open={openModal} onClose={handleOpenCloseModal}>
        <Box sx={styleModal}>
          <Alert variant="filled" severity="warning" sx={{ fontSize: '1.5rem' }} onClick={handleOpenCloseModal}>
            You have already deleted all categories!
          </Alert>
        </Box>
      </Modal>
    </>
  );
}
