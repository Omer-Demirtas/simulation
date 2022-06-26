import { Divider, Stack } from "@mui/material";
import React from "react";


const SettingsRow = ({children, noDivider}) =>
{

    return (
        <React.Fragment>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{my: 1}}
            >
                {children}
            </Stack>
            {!noDivider && <Divider />}
        </React.Fragment>
    );
}
export default SettingsRow;