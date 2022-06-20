import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";


const UserDialog = ({ handleClose, open}) => 
{
    const dispatch = useDispatch();

    const handleAddNewType = () => 
    {
        handleClose();
    }

    return (
        <Dialog
            maxWidth="xs"
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"User Feature"}
            </DialogTitle>
            <DialogContent>
                <Stack
                    direction="column"
                >
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