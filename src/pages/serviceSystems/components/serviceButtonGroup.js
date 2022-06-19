import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addService } from '../../../features/service/serviceSlice';
import ServiceDialog from "./serviceDialog";


const ServiceButtonGroup = () =>
{
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleClickOpen = () => setOpen(true);

    const handleNewService = (service) => dispatch(addService(service));

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
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ServiceButtonGroup;