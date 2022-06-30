import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicDialog from "../../../../components/common/basicDialog";
import SettingsRow from "../../../../components/common/settings/settingsRow";
import { selectServiceTypes, updateServiceType, updateServiceTypeDetails } from "../../../../features/service/serviceSlice";
import useFormFields from "../../../../utils/hooks/useFormFields";
import ServiceTypeDialog from "./serviceTypeDialog";

const ServiceDetailDialog = ({open, handleClose, params}) =>
{
    const [input, handleChange, handleReload] = useFormFields({serviceNo: "", serviceType: ""});
    const [serviceTypeOpen, setServiceTypeOpen] = useState(false);

    const dispatch = useDispatch();

    const handleSave = () => 
    {
        dispatch(updateServiceType({serviceNo: input.serviceNo, serviceType: input.serviceType}))
        handleClose();
    }

    const serviceTypes = useSelector(selectServiceTypes) 

    const handleOpenDialog = () =>setServiceTypeOpen(true);
    const handleCloseServiceType = () => setServiceTypeOpen(false);
    const handleSaveServiceType = (dist) => 
    {
        dispatch(updateServiceTypeDetails({id: input.serviceType, distribution: dist}))
        handleCloseServiceType();
    }

    useEffect(() => {
        if(params && Object.values(params).length !== 0) handleReload(params)
    }, [params]);

    if(!params) return (<></>);

    return (
        <React.Fragment>
            {
                input.serviceType && (
                    <ServiceTypeDialog 
                        id={input.serviceType}
                        open={serviceTypeOpen}
                        handleClose={handleCloseServiceType}
                        handleSave={handleSaveServiceType}
                    />
                )
            }
            <BasicDialog
                open={open}
                height="50%"
                handleSave={handleSave}
                handleClose={handleClose}
            >
                <h1>Service Details</h1>
                <Stack
                    direction="column"
                    spacing={2}
                >
                    <SettingsRow noDivider={true} >
                        <TextField
                            fullWidth
                            disabled
                            id="serviceName" 
                            value={params.serviceNo}
                            onClick={() => {}}
                            label="Service Name" 
                            variant="outlined" 
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
        </React.Fragment>
    );
}

export default ServiceDetailDialog;