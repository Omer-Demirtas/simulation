import { Button, Fab, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ServiceTypeDialog from "./serviceTypeForm/serviceTypeDialog";

const ServiceForm = ({ isSaved, handleAddNewService }) => 
{
    const [serviceTypes, servicesLength] = useSelector(state => [state.service.serviceTypes, state.service.services.length]);

    const [open, setOpen] = useState(false);
 
    const [input, setInput] = useState(
        {
            title: `${servicesLength + 1}`,
            serviceType: 0
        }
    );    

    const handleChangeInput = (e) => setInput({...input, [e.target.name]: e.target.value})

    const handleClose  = () => setOpen(false);
    const handleOpen  = () => setOpen(true);

    useEffect(() => {
        if(isSaved) handleAddNewService({...input, id: input.title})
    }, [isSaved]);

    return (
        <React.Fragment>
            <ServiceTypeDialog 
                open={open}
                handleClose={handleClose}
            />
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
                <Button
                    onClick={handleOpen}
                >
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
        </React.Fragment>
    );
}  

export default ServiceForm;