import { Button, Card, Dialog, DialogActions, DialogContent } from "@mui/material";


const BasicDialog = ({open, handleClose, children}) =>
{

    return (
        <Dialog
            open={open}
            maxWidth="md"
            fullWidth={true}
            onClose={handleClose}
            PaperProps={{
                sx: {
                  width: "50%",
                  minHeight: '70%',
                  maxHeight: '70%',
                }
              }}
        >
            {children}
        </Dialog>
    );
}

export default BasicDialog;