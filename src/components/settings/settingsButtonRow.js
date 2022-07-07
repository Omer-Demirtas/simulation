import { Button } from "@mui/material";
import SettingsRow from "../common/settings/settingsRow";

const SettingsButtonRow = ({onClick, title}) =>
{
    return (
        <SettingsRow>
            <Button
                sx={{textTransform: 'none'}}
                onClick={onClick}
            >
               {title}
            </Button>
        </SettingsRow>
    );
}

export default SettingsButtonRow;