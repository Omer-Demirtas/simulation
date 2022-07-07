import { Button } from "@mui/material";
import SettingsRow from "../common/settings/settingsRow";

const SettingsButtonRow = ({onClick, title, color}) =>
{
    return (
        <SettingsRow>
            <Button
                sx={{textTransform: 'none'}}
                onClick={onClick}
                color={color}
            >
               {title}
            </Button>
        </SettingsRow>
    );
}

SettingsButtonRow.defaultProps = 
{
    color: 'info'
}

export default SettingsButtonRow;