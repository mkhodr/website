import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Box, Spacer } from '@chakra-ui/react'

import Navbar from './components/Navbar/Navbar'

function App() {
  return (

    <Box className='App'>
      <Navbar />
      <Outlet />
    </Box>

  )
}

export default App
