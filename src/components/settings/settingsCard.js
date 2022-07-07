import { Card, Grid, Stack, Typography } from "@mui/material";


const SettingsCard = ({children, title, isMobile}) =>
{
    return (
        <Grid
            item
            xs={12}
            md={12}
            lg={3}
        >
            <Card
                elevation={12}
                sx={{p: 1,height: '100%', borderRadius: 5}}
            >
                <Stack
                    direction="column"
                    sx={{p: 1}}
                    spacing={2}
                >
                    <Typography variant='h4'>
                        {title}
                    </Typography>
                </Stack>
                {children}
            </Card>
        </Grid>
    );
}

export default SettingsCard;