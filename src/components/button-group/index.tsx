import Box from '@mui/material/Box';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../hook';
import { setSelectValue } from '../../store/selectSlice';

export function ButtonSelectGroup() {
  const [value, setValue] = useState('All');
  const dispatch = useAppDispatch();
  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
    setValue(newValue);
    dispatch(setSelectValue({ selectValue: newValue }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <ToggleButtonGroup
        color="primary"
        size="large"
        fullWidth
        sx={{ width: '90%', marginTop: 2 }}
        onChange={handleChange}
        exclusive
        aria-label="Platform"
        value={value}
      >
        <ToggleButton value="All" disabled={value === 'All'}>
          All
        </ToggleButton>
        <ToggleButton value="Completed" disabled={value === 'Completed'}>
          Completed
        </ToggleButton>
        <ToggleButton value="Deleted" disabled={value === 'Deleted'}>
          Deleted
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
