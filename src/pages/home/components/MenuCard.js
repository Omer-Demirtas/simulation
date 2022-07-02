import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";



const MenuCard = ({ title, description, url, navigate}) => 
{

    const navigateTo = () => navigate(url);

    return (
        <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{borderRadius: 5}}  elevation={4}>
                <CardActionArea onClick={navigateTo}>
                    <CardContent sx={{minHeight: 200, }}> 
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default MenuCard;