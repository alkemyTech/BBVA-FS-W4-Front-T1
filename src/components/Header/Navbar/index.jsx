import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

const pages = ['Transferencias', 'Plazo fijo', 'Deposito'];
const settings = ['Perfil', 'Cuentas', 'Logout'];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{backgroundColor: 'rgba(100, 50, 150)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*Logo y nombre*/}
          <Typography variant="h6" noWrap component="a" href="#Home"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
              fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none'}}>
            MagicDogs
          </Typography>
          {/*Menu Hambur pantalla chica*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/*Menu Hambur icono*/}
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"
              aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon/>
            </IconButton>
            {/*Menu Hambur opciones*/}
            <Menu id="menu-appbar" anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}} keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left',}}
              open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
              sx={{display: { xs: 'block', md: 'none' }}}>
              
              <Button onClick={handleCloseNavMenu} href='#transferencia'
                sx={{ my: 1, color: 'black', display: 'block', paddingLeft:'15px'}}>
                Transferencias </Button>  
              <Button onClick={handleCloseNavMenu} href='#plazo-fijo'
                sx={{ my: 1, color: 'black', display: 'block', paddingLeft:'15px'}}>
                Plazo fijo </Button>
              <Button onClick={handleCloseNavMenu} href='#deposito'
                sx={{ my: 1, color: 'black', display: 'block', paddingLeft:'15px'}}>
                Deposito </Button>
            </Menu>
          </Box>
          {/*Logo y nombre pantalla chica*/}
          <Typography variant="h5" noWrap component="a" href="#Home"
            sx={{mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1,
              fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem',
              color: 'inherit', textDecoration: 'none'}}>
            MagicDogs
          </Typography>
          {/*Navbar opciones pantalla grande*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end',
                paddingRight: '80px'}}>
            <Button onClick={handleCloseNavMenu} href='#transferencia'
                sx={{ my: 1, color: 'white', display: 'block', padding: '6px 30px',
                     fontFamily: 'monospace', fontWeight: 600, fontSize: 18 }}>
                Transferencias </Button>
            <Button onClick={handleCloseNavMenu} href='#plazo-fijo'
                sx={{ my: 1, color: 'white', display: 'block', padding: '6px 30px',
                   fontFamily: 'monospace', fontWeight: 600, fontSize: 18  }}>
                Plazo fijo </Button>
            <Button onClick={handleCloseNavMenu} href='#deposito'
                sx={{ my: 1, color: 'white', display: 'block', padding: '6px 30px', 
                    fontFamily: 'monospace' , fontWeight: 600, fontSize: 18 }}>
                Deposito </Button>
          </Box>
          {/*Perfil usuario pantalla grande*/}
          <Box sx={{ flexGrow: 0 }}>
            {/*Foto perfil pantalla grande*/}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                
                <Avatar alt="Imagen de usuario" src="Imagen de usuario" />
              </IconButton>
            </Tooltip>
            {/*Menu usuario*/}
            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right'}} keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right'}}
              open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              <Typography sx={{ my: 1, color: 'black', display: 'block', padding:'10px 15px'}}>Nombre de usuario</Typography>
            {/*Menu usuario opciones*/}
              <Button onClick={handleCloseUserMenu} href='#perfil'
                sx={{ my: 1, color: 'black', display: 'block', paddingLeft:'15px'}}>
                Perfil</Button>
              <Button onClick={handleCloseUserMenu} href='#cuentas'
                sx={{ my: 1, color: 'black', display: 'block', paddingLeft:'15px'}}>
                Cuentas</Button> 
              <Button onClick={handleCloseUserMenu} href='#logout'
                sx={{ my: 1, color: 'black', display: 'block', paddingLeft:'15px'}}>
                Logout</Button>  
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}