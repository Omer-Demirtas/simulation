import { Button } from "@mui/material";
import BasicDialog from "../../../../components/common/basicDialog";
import SettingsRow from "../../../../components/common/settings/settingsRow";


const ServiceActionsDialog = ({open, handleClose}) =>
{

    return (
        <BasicDialog
            open={open}
            title="Service Actions"
            handleClose={handleClose}
        >
            <SettingsRow>
                <Button>
                    Add new Service Type
                </Button>
            </SettingsRow>
            <SettingsRow>
                <Button>
                    Update Service Types
                </Button>
            </SettingsRow>
        </BasicDialog>
    );
}

export default ServiceActionsDialog;