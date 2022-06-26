import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TableBody, TableCell, TableRow, TextField, Typography, Zoom } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
        <Dialog
            maxWidth="xs"
            fullWidth={true}
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                  maxHeight: '40%',
                  minHeight: '40%',
                }
            }}
        >
            <DistributionDialog
                open={dialogOpen}
                distribution={user.gas.value}
                handleClose={handleDialogClose}
                saveDistribution={handleSaveDistribution}
                distributionType={user.gas.distributionType}
            />
            <DialogTitle id="alert-dialog-title">
                {"Customer Settings"}
            </DialogTitle>
            <DialogContent>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button onClick={handleAddNewType}>
                OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserDialog;