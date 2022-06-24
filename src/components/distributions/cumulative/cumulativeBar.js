import { Chip, Stack } from "@mui/material";

/* onDelete={() => {}} */
const CumulativeBar = ({ cumulative }) => 
{
    return (
        <Stack
            direction="row"
            justifyContent="center"
        >
            {
                Object.keys(cumulative).map(k => (
                    <Chip
                        key={k}
                        sx={{ mr: 1 }}
                        variant="outlined"
                        label={`${k} : ${cumulative[k]}`}
                    />
                ))
            }
        </Stack>
    );
}

export default CumulativeBar;