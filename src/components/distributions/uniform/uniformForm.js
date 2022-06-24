import { Stack, TextField } from "@mui/material";



const UniformForm = ({ value, handleChange }) =>
{

    return (
        <Stack 
            sx={{mt: 3}}
            spacing={3}
            direction="row"
            justifyContent="center"
        >
            <TextField 
                name="a"
                value={value.a}
                onChange={handleChange}
            />
            <TextField 
                name="b"
                value={value.b}
                onChange={handleChange}
            />
        </Stack>
    );
}

export default UniformForm;