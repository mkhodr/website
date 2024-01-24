import React, { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardBody, Box, Heading, Center, SimpleGrid, GridItem, useColorModeValue, Stat, StatLabel, StatNumber, StatHelpText, Button} from '@chakra-ui/react'
import Statistics from '../components/Iss/Statistics';
import { Map, addLine, removeLine, updateMarker } from '../components/Iss/GoogleMaps';

function Iss() {
  // .env variables
  const backendApi = import.meta.env.VITE_API_URL;

  // custom coloring
  const cardbg = useColorModeValue('gray.100', 'gray.900')
  const boxbg = useColorModeValue('gray.200', 'gray.800')

  // Hooks
  const mapRef = useRef(null) // Reference to the map
  const markerRef = useRef(null)
  const lineRef = useRef(null)
  const [locations, setLocations] = useState(null)
  const [lastEntry, setLastEntry] = useState(null)
  const [isLineVisible, setIsLineVisible] = useState(true);

  const toggleLineVisibility = () => {
    setIsLineVisible(prev => !prev)
  }
  
  // Map initialization
  Map({mapRef})

  useEffect(() => {
      if (isLineVisible) {
        addLine({locations, lineRef, mapRef})
      }
      else {
        removeLine()
      }
    
    return () => {}
  }, [isLineVisible])

  
  // Effects
  useEffect(() => {
    fetchData()
    const intervalFetch = setInterval(async () => {
      await fetchData()
    }, 10000);
  
    return () => {
      clearInterval(intervalFetch)
    }
  }, [])
  
  useEffect(() => {
      if (locations) {
        updateMarker({lastEntry ,markerRef, mapRef})
        if (isLineVisible) {
          addLine({locations, lineRef, mapRef})
          console.log('ta ativo, atualizando')
        }}
  }, [lastEntry]);
  
  


  // Functions
  async function fetchData() {
    try {
      const response = await fetch(`${backendApi}iss/`);
      if (!response.ok) {
        throw new Error(`An error occurred while reaching for the API - ${response.status}`);
      }
      // api results response
      const result = await response.json();
      const last_entry = result.last_entry
      

      const frontKeysToRemove = ['id' ,'solar_lat', 'solar_lon', 'units']
      frontKeysToRemove.forEach(key => {
        delete last_entry[key];
      });
      setLocations(result.locations);
      setLastEntry(last_entry);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  

  function removeLine() {
      lineRef.current.setMap(null)
    }
    

  return(
  <>
  <Card mt='5' bg={cardbg}>
    <CardHeader pb={0}>
      <Heading as={'h1'} pb={3} fontSize={'calc(20px + 0.390625vw)'}>ISS location</Heading>
      {/* display only if position is true */}
      <SimpleGrid columns={[3, null, 7]} spacing={0}>
      {lastEntry ? (
        <>
        <Statistics array={lastEntry}></Statistics>
        <Button onClick={() => toggleLineVisibility()}> {isLineVisible ? 'HIDE PATH' : 'SHOW PATH'} </Button>
        </>
        ) : (
        <GridItem colSpan={3} py={4}>
             Loading Data ... 
        </GridItem>
    
      )}
      </SimpleGrid>

    </CardHeader>
    <CardBody>
      <Box id='map' width={'100%'} height={'600px'}>
      </Box>
    </CardBody>
  </Card>
  </>
  );
}
export default Iss;