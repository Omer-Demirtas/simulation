import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicDialog from "../../../../components/common/basicDialog";
import SettingsRow from "../../../../components/common/settings/settingsRow";
import DistributionDialog from "../../../../components/distributions/distributionDialog";
import { selectUser, updateUserDistribution } from "../../../../features/service/serviceSlice";
import ServiceTypeRateDialog from './serviceTypeRateDialog'

const UserDialog = ({ handleClose, open, serviceTypes}) => 
{
    const [dialogOpen, setDialogOpen] = useState(0);
 
    const user = useSelector(statea => selectUser(statea))

    const dispatch = useDispatch();

    const handleDialogClose = () => setDialogOpen(0);
    const handleOpenDialog = () => setDialogOpen(1);
    const handleOpenServiceTypeRate = () => setDialogOpen(2); 

    const handleSave = () =>
    {
        handleClose();
    }

    const handleSaveDistribution = (distribution) => 
    {
        dispatch(updateUserDistribution(distribution))
    }

    return (
        <BasicDialog
            open={open}
            handleSave={handleSave}
            handleClose={handleClose}
            title={"User Settings"}
        >
            <ServiceTypeRateDialog
                open={dialogOpen === 2}
                serviceTypes={serviceTypes}
                handleClose={handleDialogClose}
            />
            <DistributionDialog
                open={dialogOpen === 1}
                distribution={user.gas.value}
                handleClose={handleDialogClose}
                saveDistribution={handleSaveDistribution}
                distributionType={user.gas.distributionType}
            />
                <SettingsRow>
                    <Button
                        onClick={handleOpenDialog}
                    >
                        Set GAS Distributon
                    </Button>
                </SettingsRow>
                <SettingsRow>
                    <Button
                        onClick={handleOpenServiceTypeRate}
                    >
                        Rate of Service Type
                    </Button>
                </SettingsRow>            
        </BasicDialog>
    );
}

export default UserDialog;