import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";



const MenuCard = ({ title, url, navigate}) => 
{

    const navigateTo = () => navigate(url);

    return (
        <Grid item sm={6} md={4} lg={3}>
            <Card elevation={4}>
            <CardActionArea onClick={navigateTo}>
            
                <CardContent> 
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem İpsum, Lorem İpsum, Lorem İpsum, Lorem İpsum, Lorem İpsum,  Lorem İpsum,
                    Lorem İpsum, Lorem İpsum,Lorem İpsum,Lorem İpsum,Lorem İpsum,Lorem İpsum,
                    Lorem İpsum,Lorem İpsum,Lorem İpsum,Lorem İpsum,Lorem İpsum,Lorem İpsum,
                    Lorem İpsum,Lorem İpsum,Lorem İpsum,Lorem İpsum,Lorem İpsum,
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        </Grid>
    );
}

export default MenuCard;