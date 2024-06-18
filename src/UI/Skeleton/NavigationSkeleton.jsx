import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import AvatarSkeleton from './AvatarSkeleton';

const SkeletonNavigation = () => {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Menu hamburguesa para pantallas pequeñas */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          </Box>

          {/* Logo central para pantallas pequeñas */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Skeleton variant="rectangular" width={150} height={40} sx={{ mr: { md: 2 } }} />
          </Box>

          {/* Avatar usuario para pantallas pequeñas */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Skeleton variant="circular" width={40} height={40} />
          </Box>

          {/* Menu de navegación y avatar para pantallas grandes */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Skeleton variant="text" width={120} height={40} sx={{ mx: 4 }} />
            <Skeleton variant="text" width={120} height={40} sx={{ mx: 4 }} />
            <Skeleton variant="text" width={120} height={40} sx={{ mx: 4 }} />
            <AvatarSkeleton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default SkeletonNavigation;
