import { Box, HStack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import ParticleStatBox from './ParticleStatBox'


function ParticlesInfo({particleInfo}) {
  const bg = useColorModeValue('gray.300', 'gray.600')
  const orderToDisplay = {'index': 'particle no.', 'x': 'X pos', 'y': 'Y pos', 'r': 'size', 'velocity': 'velocity', 'consumed': 'consumed', 'calories': 'calories'}
  const displayToOrder = {};

  Object.keys(orderToDisplay).forEach(key => {
    const value = particleInfo[key];
    displayToOrder[orderToDisplay[key]] = value;
  });
  

  return (
    <Box bg={bg} justifyContent={'center'}>
      <HStack alignItems={'center'} justifyContent={'center'} py={1}>
        {Object.keys(displayToOrder).map((key) => (
          <ParticleStatBox key={key} label={key} value={displayToOrder[key]}/>
        ))}
      </HStack>
    </Box>
  )
}


export default ParticlesInfo