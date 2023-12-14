import React from 'react'
import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react'
import HomeContainer from '../components/HomeContainer/HomeContainer'

export default function Home() {
  const bg = useColorModeValue('gray.200', 'gray.700')
  const bg2 = useColorModeValue('tomato', 'papayawhip')
  const bg3 = useColorModeValue('papayawhip', 'tomato')
  return (
    <Box py={5}>
    <Grid
      h='84vh'
      templateRows={['repeat(9, 1fr)', null, 'repeat(2, 1fr)']}
      templateColumns={[2 ,null ,'repeat(5, 1fr)']}
      gap={3}
    >
      <GridItem rowSpan={[1, null ,3]} colSpan={[2, null, 1]} bg={bg}> <HomeContainer/> </GridItem>
      <GridItem rowSpan={[2, null ,1]} colSpan={[2, null, 2]} bg={bg2}> </GridItem>
      <GridItem rowSpan={[2, null ,1]} colSpan={[2, null, 2]} bg={bg2}> </GridItem>
      <GridItem rowSpan={[4, null ,2]} colSpan={[2, null, 4]} bg={bg3}> </GridItem>
    </Grid>
  </Box>
  )
}


