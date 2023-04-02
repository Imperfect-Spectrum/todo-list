import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../hook';
import { RootState } from '../../store';
import { deleteList, setValueSort } from '../../store/sortSlice';
import { deleteTodoList } from '../../store/todoSlice';

export function ControlRadio() {
  const dispatch = useAppDispatch();
  const sortList = useAppSelector((state: RootState) => state.sorts.sortList);
  const sortValue = useAppSelector((state: RootState) => state.sorts.sortValue);

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
  };

  return (
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
  );
}
