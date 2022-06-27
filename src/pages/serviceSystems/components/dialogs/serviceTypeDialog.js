import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicDialog from "../../../../components/common/basicDialog";
import SettingsRow from "../../../../components/common/settings/settingsRow";
import DistributionDialog from "../../../../components/distributions/distributionDialog";
import { selectServiceTypes } from "../../../../features/service/serviceSlice";

const ServiceTypeDialog = ({ id, open, handleClose, handleSave}) => 
{
    const [distribution, setDistribution] = useState();
    const [openDistribution, setOpenDistribution] = useState(false);

    const serviceTypes = useSelector(selectServiceTypes)

    const handleOpenDistribution = () => setOpenDistribution(true);
    const handleCloseDistribution = () => setOpenDistribution(false);

    const handleSaveDistribution = (d) => 
    {
        setDistribution({value: d.distribution, distributionType: d.distributionType});
    };

    const handleSaveType = () =>
    {
        handleSave(distribution);
    }

    return (
        <React.Fragment>
            <DistributionDialog 
                open={openDistribution}
                handleClose={handleCloseDistribution}
                saveDistribution={handleSaveDistribution}
                distribution={serviceTypes[id].value}
                distributionType={serviceTypes[id].distributionType}
            />
            <BasicDialog
                open={open}
                handleSave={handleSaveType}
                handleClose={handleClose}
            >
                <Stack
                    spacing={4}
                    direction="column"
                >
                    <Typography variant="h4">
                        {serviceTypes[id].title}
                    </Typography>
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