import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ServiceForm from './serviceForm';

const ServiceDialog = ({ open, handleClose, serviceTypes, handleNewService }) => 
{
  const [state, setState] = React.useState({isSaved: false});

  const activeAddService = () => setState({...state, isSaved: true})

  const handleAddNewService = (input) =>
  {
    setState({...state, isSaved: false});
    handleNewService(input);
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
        {"Add new service"}
    </DialogTitle>
    <DialogContent>
      <ServiceForm
            isSaved={state.isSaved} 
            serviceTypes={serviceTypes}
            handleAddNewService={handleAddNewService}
      />
        <DialogContentText id="alert-dialog-description">
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button onClick={activeAddService} autoFocus>
          OK
        </Button>
    </DialogActions>
    </Dialog>
  );
}


export default ServiceDialog;