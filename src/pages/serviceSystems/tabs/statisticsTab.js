import { Card, Grid, Stack } from "@mui/material";
import LineChart from "../../../components/charts/lineChart";
import PieChart from "../../../components/charts/pieChart";


const StatisticsTab = () => 
{

    return (
        <Stack
                sx={{p: 3, height: '100%'}}
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
            >
                <Stack
                    sx={{height: '90%', width: '90%'}}
                >
                    <Grid 
                        container
                        spacing={2}
                    >
                        <Grid item xs={12} md={4} lg={3}>
                            <Card 
                                elevation={8}
                                sx={{borderRadius: 5, p: 2}}
                            >
                                <PieChart />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={8} lg={6}>
                            <Card 
                                elevation={8}
                                sx={{borderRadius: 5, p: 2}}
                            >
                                <LineChart />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Card 
                                elevation={8}
                                sx={{borderRadius: 5, p: 2}}
                            >
                                <PieChart />
                            </Card>
                        </Grid>
                    </Grid>
                </Stack>
        </Stack>
    );
}

export default StatisticsTab;