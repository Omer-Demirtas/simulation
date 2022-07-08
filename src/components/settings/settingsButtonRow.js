import { Button } from "@mui/material";
import SettingsRow from "../common/settings/settingsRow";

const SettingsButtonRow = ({onClick, title, color, disabled}) =>
{
    return (
        <SettingsRow>
            <Button
                disabled={disabled}
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
    color: 'info',
    disabled: false
}

export default SettingsButtonRow;