import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../hook';
import { RootState } from '../../store';
import { setValueSort } from '../../store/sortSlice';

export function ControlRadio() {
  const dispatch = useAppDispatch();
  const sortList = useAppSelector((state: RootState) => state.sorts.sortList);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    dispatch(
      setValueSort({
        sortValue: value,
        sortList: [],
      })
    );
  };

  return (
    <div>
      <Typography variant="h5" color="primary" sx={{ marginBottom: 1, marginTop: 1 }}>
        Select a category
      </Typography>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{ display: 'flex', flexDirection: 'column' }}
          onChange={handleChange}
        >
          {sortList.map((sort) => (
            <FormControlLabel
              key={sortList.indexOf(sort)}
              value={sort.sortName}
              control={<Radio />}
              label={sort.sortName}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
