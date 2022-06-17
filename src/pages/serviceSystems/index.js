import { Button, Card, Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";




const ServiceSystemPage = () =>
{
    const [pageState, setPageState] = useState(
        {
            services: [
                {
                    id: 1,
                    name: 'Kasa-1',
                }
            ]
        }
    );

    const addNewService = () => {};

    return(
       <Stack direction="column">
            <Grid 
                sx={{paddingTop: '2rem'}}
                direction="row"
                justifyContent="center"
                alignItems="center"
                container
            >
            <Grid sx={{height: '700px'}} item xs={9}>
                <Card elevation={12} sx={{height: '100%'}}>

                    <Stack 
                        alignItems="flex-start"
                        justifyContent="flex-end"
                        sx={{height: '33.33%'}} 
                        direction="row" 
                    >
                        <Box sx={{bgcolor: 'green', width: 100, height: '50%'}}>
                            ASD
                        </Box>
                        <Box sx={{bgcolor: 'green', width: 100, height: '50%'}}>
                            ASD
                        </Box>
                    </Stack>
                    <Stack sx={{height: '33.33%'}} direction="row" >
                    </Stack>
                    <Stack sx={{height: '33.33%'}} direction="row" >
                    </Stack>
                </Card>
            </Grid>
            </Grid>

            <Grid
                sx={{paddingTop: '2rem'}}
                direction="row"
                justifyContent="center"
                alignItems="center"
                container
            >
                <Grid item xs={9}>
                    <Button 
                        onClick={addNewService}
                        variant="contained" color="success">
                        Add New Service
                    </Button>
                </Grid>
            </Grid>
       </Stack>
    );
}

export default ServiceSystemPage;