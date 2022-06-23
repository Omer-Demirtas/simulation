import { Button, Dialog, DialogActions, DialogContent, Stack } from "@mui/material";


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
                  maxHeight: '60%',
                  minHeight: '60%',
                  p:1
                }
            }}
        >
            <DialogContent
                sx={{ m:0, p: 0 }}
            >
                {children}
            </DialogContent>
            <DialogActions
                sx={{ m:0, p: 0 }}
            >
                <Button>asd</Button>
            </DialogActions>
        </Dialog>
    );
}

export default BasicDialog;