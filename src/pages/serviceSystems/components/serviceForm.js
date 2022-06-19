import { Button, Fab, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const ServiceForm = ({ serviceTypes, isSaved, servicesLength, handleAddNewService }) => 
{
    const [input, setInput] = useState(
        {
            title: `${servicesLength + 1}`,
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


            <Stack direction="row">
            <FormControl 
                fullWidth={true}
                sx={{mr: 1, minWidth: 120 }}
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
            <Button>
                +
            </Button>
            {
                /*
                <Fab variant="extended">
                    <Icon sx={{ mr: 1 }} />
                    Extended
                </Fab>
                */
            }
            </Stack>



            
        </Stack>
    );
}  

export default ServiceForm;