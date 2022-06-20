import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addService, createTable } from '../../../features/service/serviceSlice';
import ServiceDialog from "./serviceDialog";


const ServiceButtonGroup = () =>
{
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleClickOpen = () => setOpen(true);

    const handleNewService = (service) => dispatch(addService(service));
    const generateTable = () => dispatch(createTable());

    return (
        <React.Fragment>
            <ServiceDialog
                open={open}
                handleClose={handleClose}
                handleNewService={handleNewService}
            />  
            <Grid
                sx={{paddingTop: '2rem'}}
                direction="row"
                justifyContent="center"
                alignItems="center"
                container
            >
                <Grid item xs={9}>
                    <Button
                        onClick={handleClickOpen}
                        variant="contained" color="success"
                    >
                        Add New Service
                    </Button>
                    <Button
                        onClick={generateTable}
                        variant="contained" color="success"
                    >
                        Create Table
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ServiceButtonGroup;