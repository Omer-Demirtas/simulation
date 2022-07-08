import { Card, Grid, Stack } from "@mui/material";
import LineChart from "../../../components/charts/lineChart";
import PieChart from "../../../components/charts/pieChart";


const StatisticsTab = ({isMobile}) => 
{
    return (
        <Grid 
            sx={{height: '100%', px: isMobile ? 1: 5}}
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