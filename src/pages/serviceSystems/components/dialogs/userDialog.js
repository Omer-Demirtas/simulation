import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TableBody, TableCell, TableRow, TextField, Typography, Zoom } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicDialog from "../../../../components/common/basicDialog";
import SettingsRow from "../../../../components/common/settings/settingsRow";
import DistributionDialog from "../../../../components/distributions/distributionDialog";
import { selectUser, updateUserDistribution } from "../../../../features/service/serviceSlice";


const UserDialog = ({ handleClose, open}) => 
{
    const handleAddNewType = () => 
    {
        handleClose();
    }
    
    const [dialogOpen, setDialogOpen] = useState(false);
 
    const user = useSelector(statea => selectUser(statea))

    const dispatch = useDispatch();

    const handleDialogClose = () => setDialogOpen(false);
    const handleOpenDialog = () => setDialogOpen(true);

    const handleSaveDistribution = (distribution) => dispatch(updateUserDistribution(distribution))

    return (
        <BasicDialog
            open={open}
            handleClose={handleClose}
            title={"User Settings"}
        >
            <DistributionDialog
                open={dialogOpen}
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
                    <Button>
                        Servis Selection statistics
                    </Button>
                </SettingsRow>            
        </BasicDialog>
    );
}

export default UserDialog;