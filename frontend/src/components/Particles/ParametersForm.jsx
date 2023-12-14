import React, { useState } from 'react'
import { Box, Button, Grid, GridItem, FormControl, FormLabel, FormHelperText, Input, Center,  } from '@chakra-ui/react'

export default function ParametersForm({socket}) {
    const [formVisibility, setFormVisibility] = useState(true);


    const toggleFormVisibility = () => {
        setFormVisibility(!formVisibility);
      };

      const sendSimulationParams = (events) => {
        const formData = document.getElementById('sim_form')
        const x = formData.X.value
        const y = formData.Y.value
        const params = {x: x, y: y, particles:formData.particles.value, foods: formData.foods.value}
        console.log(params)
        socket.send(JSON.stringify(params))
      }
      
      const handleButtonClick = () => {
        toggleFormVisibility();
        sendSimulationParams();
      };
    
    
    return (
      <>
      {formVisibility &&
        <Box border={'solid'} borderColor={'gray'} borderWidth={'1px'}>
        <form id="sim_form">
        <Grid templateColumns={['repeat(2, 1fr)', null, 'repeat(5, 1fr)' ]} columnGap={10}>
        <FormControl>
          <FormLabel textAlign={'center'} my={0} >Arena X</FormLabel>
          <Input id='X' textAlign={'center'} defaultValue={1000} type={'number'} />
          <FormHelperText my={0}> Arena <b><i>X</i></b> size</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel textAlign={'center'} my={0} >Arena Y</FormLabel>
          <Input id='Y' textAlign={'center'} defaultValue={700} type={'number'} />
          <FormHelperText my={0}> Arena <b><i>Y</i></b> size</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel textAlign={'center'} my={0} >Particles</FormLabel>
          <Input id="particles" textAlign={'center'} defaultValue={200} type={'number'} />
          <FormHelperText my={0}> no. of <b><i>particles</i></b> for the simulation</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel textAlign={'center'} my={0} >Foods</FormLabel>
          <Input id="foods" textAlign={'center'} py={0} defaultValue={500} type='number' />
          <FormHelperText my={0}> no. of <b><i>foods</i></b> for the simulation</FormHelperText>
        </FormControl>
        <Center>
          <GridItem colSpan={[2, null, 1]} > 
              <FormControl>
                <FormLabel textAlign={'center'} my={0} ></FormLabel>
                <Button mt={0} onClick={handleButtonClick}> Run Simulation </Button>
                <FormHelperText my={0}> </FormHelperText>
              </FormControl>
          </GridItem>
        </Center>
    
        </Grid>
        </form>
        </Box>
      }
      {!formVisibility &&
        <Box>
          <Button mt={0} onClick={toggleFormVisibility}> show form </Button>
        </Box>
      }
      </>
  )
}

