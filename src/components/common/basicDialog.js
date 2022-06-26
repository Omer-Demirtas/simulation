import { Button, Dialog, DialogActions, DialogContent, Stack } from "@mui/material";


const BasicDialog = ({open, handleClose, children, handleSave,widthCode, height}) =>
{

    return (
        <Dialog
            open={open}
            maxWidth={widthCode}
            fullWidth={true}
            onClose={handleClose}
            PaperProps={{
                sx: {
                  maxHeight: height,
                  minHeight: height,
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

BasicDialog.defaultProps = {
    widthCode: "xs",
}

export default BasicDialog;