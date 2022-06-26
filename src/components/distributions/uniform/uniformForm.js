import { Button, Stack, TextField } from "@mui/material";



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
                type="number"
                value={value.a}
                onChange={handleChange}
                InputLabelProps={{shrink: true,}}
            />
            <TextField 
                name="b"
                type="number"
                value={value.b}
                onChange={handleChange}
                InputLabelProps={{shrink: true,}}

            />
        </Stack>
    );
}

export default UniformForm;