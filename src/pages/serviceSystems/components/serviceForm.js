import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const ServiceForm = ({ serviceTypes, isSaved, handleAddNewService }) => 
{
    console.log('serviceForm component');

    const [input, setInput] = useState(
        {
            title: `${serviceTypes.length + 1}`,
            serviceType: 0
        }
    );    

    const handleChangeInput = (e) => setInput({...input, [e.target.name]: e.target.value})

    useEffect(() => {
        if(isSaved) handleAddNewService(input)
    }, [isSaved]);

    return (
        <Stack
            spacing={3}
            direction="column"
        >
            <TextField
                name="title"
                label="Title" 
                variant="outlined"
                sx={{marginTop: '1rem'}}
                value={input.title}
                onChange={handleChangeInput}
            />

            <FormControl 
                fullWidth={true}
                sx={{ m: 1, minWidth: 120 }}
            >
                <InputLabel id="demo-simple-select-helper-label">Service Type</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={input.serviceType}
                    name="serviceType"
                    label="Service Type"
                    onChange={handleChangeInput}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        serviceTypes.map((s, i) => <MenuItem key={s.title} value={i}>{s.title}</MenuItem>)
                    }
                </Select>
                {
                    // <FormHelperText>With label + helper text</FormHelperText>
                }
            </FormControl>
        </Stack>
    );
}  

export default ServiceForm;