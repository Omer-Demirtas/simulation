import { Card, Dialog } from "@mui/material";


const BasicDialog = ({open, handleClose, children}) =>
{

    return (
        <Dialog
            open={open}
            maxWidth="md"
            fullWidth={true}
            onClose={handleClose}
            sx={{height: '400px'}}
        >
            <Card sx={{width: '100%', height: '100%', bgcolor: 'red'}}>
             {children}
            </Card>
        </Dialog>
    );
}

export default BasicDialog;