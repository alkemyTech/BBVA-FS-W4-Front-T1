import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import SkeletonNavigation from '../../UI/Skeleton/NavigationSkeleton';

export default function Header() {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [token]);

  if (!token) {
    return null;
  }

  return (
    <>
      {loading ? <SkeletonNavigation /> : <Navbar />}
    </>
  );
}
