import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicDialog from "../../../../components/common/basicDialog";
import SettingsRow from "../../../../components/common/settings/settingsRow";
import DistributionDialog from "../../../../components/distributions/distributionDialog";
import { selectServiceTypes } from "../../../../features/service/serviceSlice";

const ServiceTypeDialog = ({ open, handleClose, handleSave, params}) => 
{
    const [id, setId] = useState(0);
    const [distribution, setDistribution] = useState();
    const [openDistribution, setOpenDistribution] = useState(false);

    const serviceTypes = useSelector(selectServiceTypes)

    const handleOpenDistribution = () => setOpenDistribution(true);
    const handleCloseDistribution = () => setOpenDistribution(false);

    const handleSaveDistribution = (d) => setDistribution({value: d.distribution, distributionType: d.distributionType});

    const getServiceTypeById = () => serviceTypes.find(t => t.id === id);

    const handleSaveType = () =>
    {
        handleSave(distribution);
    }

    useEffect(() => {
        if(params) setId(params.id) 
    }, [params])

    if(!params) return (<></>)

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
                    spacing={4}
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
                    <SettingsRow>
                        <Button
                            onClick={handleOpenDistribution}
                        >
                            Select Distribution 
                        </Button>
                    </SettingsRow>
                </Stack>
            </BasicDialog>
        </React.Fragment>
    );
}

export default ServiceTypeDialog;