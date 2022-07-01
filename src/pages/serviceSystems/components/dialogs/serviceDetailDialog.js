import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BasicDialog from "../../../../components/common/basicDialog";
import SettingsRow from "../../../../components/common/settings/settingsRow";
import { addService, updateServiceType, updateServiceTypeDetails } from "../../../../features/service/serviceSlice";
import useFormFields from "../../../../utils/hooks/useFormFields";

const ServiceDetailDialog = ({open, handleClose, params, serviceTypes}) =>
{
    const [input, handleChange, handleReload] = useFormFields({serviceNo: "", serviceType: ""});

    const dispatch = useDispatch();

    const handleSave = () => 
    {
        if(params.isNew) dispatch(addService({id: input.serviceNo, serviceNo: input.serviceNo, serviceType: input.serviceType}))
        else dispatch(updateServiceType({serviceNo: input.serviceNo, serviceType: input.serviceType}))
        handleClose();
    }

    useEffect(() => 
    {
        if(params)
        {   
            handleReload(params)
        }
    }, [params]);

    if(!params) return (<></>);

    return (
        <BasicDialog
            open={open}
            height="50%"
            handleSave={handleSave}
            handleClose={handleClose}
            title="Service Details"
        >
            <Stack
                direction="column"
                spacing={2}
            >
                <SettingsRow noDivider={true} >
                    <TextField
                        disabled
                        fullWidth
                        id="serviceName" 
                        variant="outlined" 
                        label="Service Name" 
                        value={params.serviceNo}
                    />
                </SettingsRow>
                <SettingsRow noDivider={true}>
                    <FormControl fullWidth>
                        <InputLabel id="serviceType">Service Type</InputLabel>
                        <Select
                            labelId="serviceType"
                            id="serviceType"
                            name="serviceType"
                            value={input.serviceType}
                            label="serviceType"
                            onChange={handleChange}
                        >
                            {
                                serviceTypes.map(s => (
                                    <MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </SettingsRow>

            </Stack>
        </BasicDialog>
    );
}

export default ServiceDetailDialog;