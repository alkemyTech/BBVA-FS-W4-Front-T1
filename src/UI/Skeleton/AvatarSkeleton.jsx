import React from 'react';
import { Avatar, Skeleton } from '@mui/material';

const AvatarSkeleton = () => {
  return (
    <Skeleton variant="circular" width={50} height={50}>
      <Avatar />
    </Skeleton>
  );
};

export default AvatarSkeleton;