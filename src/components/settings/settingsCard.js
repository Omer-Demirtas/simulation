import { Card, Grid, Stack, Typography } from "@mui/material";


const SettingsCard = ({children, title, isMobile, xs, md, lg}) =>
{
    return (
        <Grid
            item
            xs={xs}
            md={md}
            lg={lg}
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