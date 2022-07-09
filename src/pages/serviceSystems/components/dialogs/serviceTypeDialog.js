import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import BasicDialog from "../../../../components/common/basicDialog";
import SettingsRow from "../../../../components/common/settings/settingsRow";
import DistributionDialog from "../../../../components/distributions/distributionDialog";
import SettingsButtonRow from "../../../../components/settings/settingsButtonRow";
import { addServiceType, updateServiceTypeDetails } from "../../../../features/service/serviceSlice";

const ServiceTypeDialog = ({ open, handleClose, params, serviceTypes}) => 
{
    const [id, setId] = useState(0);
    const [distribution, setDistribution] = useState();
    const [openDistribution, setOpenDistribution] = useState(false);    

    const dispatch = useDispatch();

    const handleOpenDistribution = () => setOpenDistribution(true);
    const handleCloseDistribution = () => setOpenDistribution(false);

    const handleSaveDistribution = (d) => setDistribution({value: d.value, distributionType: d.distributionType});

    const getServiceTypeById = () => serviceTypes.find(t => t.id === id);

    const handleSaveType = () => 
    {
        if(distribution) dispatch(updateServiceTypeDetails(({distribution,id})));
        handleClose();
    }

    useEffect(() => {
        if(params) setId(params.id) 
    }, [params])

    if(!open || !params) return (<></>)

    return (
        <React.Fragment>
            <DistributionDialog 
                open={openDistribution}
                handleClose={handleCloseDistribution}
                saveDistribution={handleSaveDistribution}
                distribution={getServiceTypeById().value}
                distributionType={getServiceTypeById().distributionType}
            />
            <BasicDialog
                open={open}
                title="Edit Service Type"
                handleClose={handleClose}
                handleSave={handleSaveType}
            >
                <Stack
                    spacing={2}
                    direction="column"
                >
                    <SettingsRow noDivider={true}>
                        <FormControl fullWidth>
                            <InputLabel id="serviceType">Service Type</InputLabel>
                            <Select
                                labelId="serviceType"
                                id="serviceType"
                                name="serviceType"
                                value={id}
                                label="serviceType"
                                onChange={(e) => setId(e.target.value)}
                            >
                                {
                                    serviceTypes.map(s => (
                                        <MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </SettingsRow>
                    <SettingsButtonRow
                        onClick={handleOpenDistribution}
                        title={'Change Distribution'}
                    />
                    <SettingsButtonRow
                        disabled={true}
                        title={'remove this service type'}
                        color="error"
                    />
                </Stack>
            </BasicDialog>
        </React.Fragment>
    );
}

export default ServiceTypeDialog;