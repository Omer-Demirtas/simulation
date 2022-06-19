import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const ServiceTypeDialog = ({ handleClose, open}) => 
{


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
                {"Add new service"}
            </DialogTitle>
            <DialogContent>
                <ServiceTypeDialog />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button>
                OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ServiceTypeDialog;