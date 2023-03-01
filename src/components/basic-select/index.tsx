import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';
import { useAppDispatch } from '../../hook';
import { setSelectValue } from '../../store/selectSlice';

export function BasicSelect() {
  const dispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(
      setSelectValue({
        selectValue: event.target.value,
      })
    );
  };

  return (
    <div>
      <Typography variant="h5" color="primary" sx={{ marginBottom: 1 }}>
        Select the type
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select onChange={handleChange} defaultValue="">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Deleted">Deleted</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
