import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import DistributionDialog from "../../../../components/distributions/distributionDialog";

const UserDialog = ({ handleClose, open}) => 
{

    const handleAddNewType = () => 
    {
        handleClose();
    }

    const [state, setState] = useState({
        1: 10,
        2: 20,
        3: 10,
        4: 30,
        5: 15,
        6: 15
    });
    const [distribution, setDistribution] = useState(false);

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
                cumulative={state}
                open={distribution}
                handleClose={() => setDistribution(false)}
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
                        onClick={() => setDistribution(true )}
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