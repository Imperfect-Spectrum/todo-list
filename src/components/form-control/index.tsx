import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../hook';
import { RootState } from '../../store';
import { setValueSort } from '../../store/sortSlice';

export function ControlRadio() {
  const dispatch = useAppDispatch();
  const sortList = useAppSelector((state: RootState) => state.sorts.sortList);

  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(
      setValueSort({
        sortValue: event.target.value,
        sortList: [],
      })
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h5" color="primary" sx={{ marginBottom: 1 }}>
        Select a category
      </Typography>
      <Box sx={{ width: '70%' }}>
        <FormControl fullWidth>
          <InputLabel>Сategory</InputLabel>
          <Select onChange={handleChange} defaultValue="" sx={{ boxShadow: 6 }}>
            {sortList.map((sort) => (
              <MenuItem
                key={sort.sortName}
                value={sort.sortName}
                sx={{
                  boxShadow: 1,
                }}
              >
                {sort.sortName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
