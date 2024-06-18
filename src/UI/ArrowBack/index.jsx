import React from 'react'
import { Box } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const ArrowBackComponent = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/home')
  }

  return (
    <Box onClick={handleClick} style={{ cursor: 'pointer', margin:"1vh"}}>
      <ArrowBack />
    </Box>
  )
}

export default ArrowBackComponent
