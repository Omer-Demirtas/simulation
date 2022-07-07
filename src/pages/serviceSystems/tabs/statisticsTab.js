import { Card, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import LineChart from "../../../components/charts/lineChart";
import PieChart from "../../../components/charts/pieChart";


const StatisticsTab = () => 
{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
        defaultMatches: true
    });

    return (
        <Grid
            direction={ isMobile ? 'column' : 'row'}
            sx={{p: 1}}
            spacing={2} 
            container  
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
    );
}

export default StatisticsTab;