import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type Props = {
  label: string;
  options: string[];
  index: number;
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ScoreInput(props: Props) {
  return (
    <Autocomplete
      disableClearable
      options={props.options}
      getOptionLabel={option => option}
      value={props.values[props.index]}
      isOptionEqualToValue={(option, value) => (value === '' || value === option)}
      onChange={(_, value) => {
        const v = value ? value : '';
        const temp = [...props.values];
        temp[props.index] = v;
        props.setValues(temp);
      }}
      renderInput={(params) => <TextField {...params} label={props.label} size='small' />}
      sx={{ width: 120 }}
    />
  );
}
