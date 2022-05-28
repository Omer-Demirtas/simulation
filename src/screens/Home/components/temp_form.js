import { Card, Stack, TextField, Typography } from "@mui/material";

const TempForm = ({ input, handleInput }) => {
  return (
    <Card sx={{my: 5, p: 3}}>
      <Stack direction="row" spacing={4}>
        <TextField
          label="a"
          variant="outlined"
          name="a"
          type="number"
          value={input.a}
          onChange={handleInput}
        />
        <TextField
          name="b"
          label="b"
          variant="outlined"
          type="number"
          value={input.b}
          onChange={handleInput}
        />
      </Stack>
    </Card>
  );
};

export default TempForm;
