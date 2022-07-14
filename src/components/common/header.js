import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import { Button, Link } from '@mui/material';


const Header = () =>
{
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/');

  return (
    <React.Fragment>
        <AppBar>
          <Toolbar>
          <Link color="white" variant="h6" component="button" onClick={navigateToHome} underline="none">
            Simulation
          </Link>

          </Toolbar>
        </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default Header;
/*
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};


export default function Header(props) 
{
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/');

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
                Simulation
            </Typography>

            <Button sx={{color: 'white', marginLeft: '10px'}} onClick={navigateToHome}  variant="text">
              Home
            </Button>

          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}

*/