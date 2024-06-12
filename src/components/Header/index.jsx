import React from 'react';
import Navbar from './Navbar';

export default function Header(){
  const token = localStorage.getItem('token');
  return (
    <>
    { !token && <Navbar/>}
    </>
  );
};