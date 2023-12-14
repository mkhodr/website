import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Box, Heading, Spacer } from '@chakra-ui/react'

const ErrorPage = () => {
  return (
    <>
    <Navbar />
    <Box height={'100vh'}>
      <Spacer py={'20vh'} />
      <Heading>Erro 404! - Página não encontrada</Heading>
    </Box>
    </>
  )
}

export default ErrorPage