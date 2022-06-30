import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack } from "@mui/material";


const BasicDialog = ({title, open, handleClose, children, handleSave,widthCode, height}) =>
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
                  borderRadius: 5
                }
            }}
        >
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions
                >
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
        </Dialog>
    );
}

BasicDialog.defaultProps = {
    widthCode: "xs",
    height: '50%'
}

export default BasicDialog;