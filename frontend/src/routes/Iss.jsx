import React, { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardBody, Box, Heading, Center, SimpleGrid, GridItem, useColorModeValue, Stat, StatLabel, StatNumber, StatHelpText} from '@chakra-ui/react'


//
// ATENCAO
// O CHAT GPT FALOU PRA EU CRIAR COMPONENTES AQUI MESMO DE CADA ESTATISTICA E JUNTAR ELES EM 1 SO EM OUTRO COMPONENTE
// E DPOIS COLOCAR SOMENTE O ULTIMO COMPONENTE NO JSX


function Iss() {
  // .env variables
  const googleKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const issAPI = import.meta.env.VITE_ISS_API_URL;

  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: googleKey,
    // Add other bootstrap parameters as needed, using camel case.
    // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
  });

  // CSRFToken
  const getCSRFToken = () => {
    const csrfCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
  };
  
  // Hooks
  const mapRef = useRef(null); // Reference to the map
  const markerRef = useRef(null); // Reference to the marker
  const [position, setPosition] = useState(null);
  const [frontResult, setFrontResult] = useState(null)


  // custom coloring
  const cardbg = useColorModeValue('gray.100', 'gray.900')
  const boxbg = useColorModeValue('gray.200', 'gray.800')

  // Effects
  useEffect(() => {
    // Fetching data from ISS api 
    async function fetchData() {
      try {
        const response  = await fetch(issAPI)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        // api results response
        const result = await response.json();
        // setting lat and lng values to update 'position' values
        const lat = result.latitude
        const lng = result.longitude
        setPosition({lat: parseFloat(lat), lng: parseFloat(lng)});
        // removing unwanted keys from result to store in database
        const keysToRemove = ['daynum', 'footprint', 'id', 'name']
        keysToRemove.forEach(key => {
          delete result[key];
        }); 
        // creating the frontend results dict
        const frontResult = result
        // removing unwanted keys from frontend results
        const frontKeysToRemove = ['solar_lat', 'solar_lon', 'units']
        frontKeysToRemove.forEach(key => {
          delete frontResult[key];
        });
        // setting frontresults
        setFrontResult(frontResult)


        // handleCreate(result)

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData();
    // Set up the interval to run the function every minute
    const intervalId = setInterval(fetchData, 120000); // 60000 milliseconds = 1 minute

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on mount

    // const handleCreate = async (result) => {
    //   try {

    //     const csrfToken = getCSRFToken();
    //     if (!csrfToken) {
    //       console.error('CSRF token not found');
    //       return;
    //     }

    //     const response = await fetch(`${import.meta.env.REACT_APP_VITE_API_URL}iss/`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-CSRFToken': csrfToken,
    //       },
    //       body: JSON.stringify(result),
    //     });

    //     if (!response.ok) {
    //       throw new Error('Error creating data');
    //     }

    //     // Handle success (optional)
    //     console.log('Data created successfully');
    //   } catch (error) {
    //     console.error('Error creating data:', error);
    //   }
    // };


  useEffect(() => {
      async function initMap() {        
        if (!mapRef.current && position) {
          // If the map doesn't exist, create it
          const { Map } = await google.maps.importLibrary('maps');
          mapRef.current = new Map(document.getElementById('map'), {
            zoom: 4,
            center: position,
            mapId: 'DEMO_MAP_ID',
          });
        } else {
        }
      }
      
      async function updateMarker() {  
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
      }
      
      initMap();
      updateMarker();

  }, [position]);

  const StatBox = ({name, number, unit}) => (
    <>
    <StatLabel fontSize={'calc(8px + 0.190625vw)'}>{name.toUpperCase()}</StatLabel>
    <StatNumber fontSize={'calc(10px + 0.70625vw)'}>{number}</StatNumber>
    <StatHelpText fontSize={'calc(6px + 0.390625vw)'}>{unit}</StatHelpText>
    </>
  );
  
  const Statistic = (array) => (
    Object.entries(array).map(([key, value]) => (
      <Stat key={key === 'timestamp' ? 'time' : key} pt={1}>
        <StatBox
        name={key === 'timestamp' ? 'time' : key}
        number={key === 'visibility' ?  value 
        : key === 'timestamp' ? (new Date(value * 1000).toLocaleTimeString()) 
        : key === 'velocity' || key === 'altitude' ? parseFloat(value).toFixed(2) 
        : parseFloat(value).toFixed(4)}
        unit={key === 'altitude' ? 'km' : key === 'velocity' ? 'km/h' : ''} />
      </Stat>
    ))
  );

  return(
  <>
  <Card mt='5' bg={cardbg}>
    <CardHeader pb={0}>
      <Heading as={'h1'} pb={3} fontSize={'calc(20px + 0.390625vw)'}>ISS location</Heading>


      {/* display only if position is true */}
      <SimpleGrid columns={[3, null, 6]} spacing={0}>
      {frontResult ? (
        <>
        {Statistic(frontResult)}
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