import { Grid, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import MenuCard from "./components/MenuCard";
import { useNavigate } from "react-router-dom";


const options = 
[
    {
        title: 'service',
        url: '/service'
    },
    {
        title: 'asd',
        url: '/service'
    },
    {
        title: 'xyz',
        url: 'service'
    },
    {
        title: 'klm',
        url: '/service'
    },
    

];

const HomePage = (props) => 
{
    const navigate = useNavigate()

    const navigateTo = (url) => navigate(url); 

    return (
        <Grid sx={{padding: '16px',}} container spacing={2}>
            {
                options.map(option => <MenuCard navigate={navigateTo} key={option.title} title={option.title} url={option.url} />)
            }
        </Grid>
    );
}

export default HomePage;