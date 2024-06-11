import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  const token = localStorage.getItem('token');
  return (
    <>
    { token && <header>
      <h1>Header</h1>
    </header>}
    </>
  );
};