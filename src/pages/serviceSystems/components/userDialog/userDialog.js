import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DistributionDialog
                open={dialogOpen}
                distribution={user.gas.value}
                handleClose={handleDialogClose}
                saveDistribution={handleSaveDistribution}
                distributionType={user.gas.distributionType}
            />
            <DialogTitle id="alert-dialog-title">
                {"User"}
            </DialogTitle>
            <DialogContent>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography variant="body1">
                        Set GAS Distributon :
                    </Typography> 
                    <Button
                        onClick={handleOpenDialog}
                    >
                        set distribution
                    </Button>
                </Stack>    
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