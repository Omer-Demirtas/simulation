import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";


const BasicDialog = ({title, open, handleClose, children, handleSave,widthCode, minHeight, maxHeight}) =>
{
    return (
        <Dialog
            open={open}
            maxWidth={widthCode}
            fullWidth={true}
            onClose={handleClose}
            PaperProps={{
                sx: {
                  maxHeight: maxHeight,
                  minHeight: minHeight,
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
    maxHeight: '80%',
    minHeight: '50%'
}

export default BasicDialog;