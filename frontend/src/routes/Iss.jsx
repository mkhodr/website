import React, { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardBody, Box, Heading, Center, SimpleGrid, GridItem, useColorModeValue, Stat, StatLabel, StatNumber, StatHelpText, Button} from '@chakra-ui/react'
import Statistics from '../components/Iss/Statistics';
//
// ATENCAO
// O CHAT GPT FALOU PRA EU CRIAR COMPONENTES AQUI MESMO DE CADA ESTATISTICA E JUNTAR ELES EM 1 SO EM OUTRO COMPONENTE
// E DPOIS COLOCAR SOMENTE O ULTIMO COMPONENTE NO JSX


function Iss() {
  // .env variables
  const googleKey = import.meta.env.VITE_GOOGLE_API_KEY;
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

  
  
  
  async function initMap() {        
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
      key: googleKey,
      // Add other bootstrap parameters as needed, using camel case.
      // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
    });
    if (!mapRef.current) {
      // If the map doesn't exist, create it
      const { Map } = await google.maps.importLibrary('maps');
      mapRef.current = new Map(document.getElementById('map'), {
        zoom: 4,
        // center: {lat: parseFloat(frontResult.latitude), lng: parseFloat(frontResult.longitude)},
        center: {lat: 0, lng: 0},
        mapId: 'DEMO_MAP_ID',
      });
    } else {
      console.log(' map already generated')
    }
  }
  initMap();
  
  
  // Effects
  useEffect(() => {
    fetchData()
    const intervalFetch = setInterval(async () => {
      await fetchData()
    }, 5000);
  
    return () => {
      clearInterval(intervalFetch)
    }
  }, [])
  
  useEffect(() => {
      if (locations) {
        updateMarker()
        addLine()
      }
      console.log(lastEntry)
  }, [lastEntry, locations]);
  
  


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
  
      
      async function updateMarker() {  
        const position = {lat: lastEntry.latitude, lng: lastEntry.longitude}
        if (markerRef.current) {
          markerRef.current.setMap(null)
          markerRef.current = null;
        }
        const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
      // If the marker doesn't exist, create it
      markerRef.current = new AdvancedMarkerElement({
        map: mapRef.current,
        position,
        title: 'ISS',
      });
      mapRef.current.setCenter(position)
    }


    async function addLine(){
      if (lineRef.current) {
        lineRef.current.setMap(null)
      }
      lineRef.current = new google.maps.Polyline({
        path: locations,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        strokeWeight: 1
      });
      lineRef.current.setMap(mapRef.current);
    }

    function removeLine() {
      lineRef.current.setMap(null)
    }
    

  return(
  <>
  <Card mt='5' bg={cardbg}>
    <CardHeader pb={0}>
      <Heading as={'h1'} pb={3} fontSize={'calc(20px + 0.390625vw)'}>ISS location</Heading>
      <Button onClick={() => removeLine()}> Remove pathline</Button>
      {/* display only if position is true */}
      <SimpleGrid columns={[3, null, 6]} spacing={0}>
      {lastEntry ? (
        <>
        <Statistics array={lastEntry}></Statistics>
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