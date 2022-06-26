import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import BasicDialog from "../../../../components/common/basicDialog";
import SettingsRow from "../../../../components/common/settings/settingsRow";
import { selectServiceTypes } from "../../../../features/service/serviceSlice";



const ServiceDetailDialog = ({open, handleClose, params}) =>
{
    const serviceTypes = useSelector(selectServiceTypes) 

    return (
        <BasicDialog
            open={open}
            height="50%"
            handleClose={handleClose}
        >
            <h1>Service Details</h1>
            <Stack
                direction="column"
                spacing={2}
            >
                <SettingsRow noDivider={true} >
                    <TextField
                        fullWidth
                        id="serviceName" 
                        value={params.serviceNo}
                        onClick={() => {}}
                        label="Service Name" 
                        variant="outlined" 
                    />
                </SettingsRow>
                <SettingsRow noDivider={true}>
                    <FormControl fullWidth>
                        <InputLabel id="serviceType">Service Type</InputLabel>
                        <Select
                            labelId="serviceType"
                            id="serviceType"
                            value={0}
                            label="serviceType"
                            onChange={() => {}}
                        >
                            {
                                serviceTypes.map(s => (
                                    <MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </SettingsRow>
            </Stack>
        </BasicDialog>
    );
}

export default ServiceDetailDialog;