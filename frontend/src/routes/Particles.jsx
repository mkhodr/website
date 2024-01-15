import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Grid, GridItem, Center } from "@chakra-ui/react";
import { React, useEffect, useState, useRef } from "react";
import BubbleChart from "../components/Particles/BubbleChart";
import ParametersForm from "../components/Particles/ParametersForm";
import { setupWebSocket } from "../components/Particles/WebSocket";


//// Ja compartimentalizei tudo que queria
/// Falta criar as tabelas de dados / info da simulação

export default function Particles() {
  const [simulationData, setSimulationData] = useState({"particles":  {'x':[], 'y': [], 'r': []}, 'foods': {'x':[], 'y': [], 'r': []}});
  const [socket, setSocket] = useState(null);
  const x = null
  const y = null
  const canvasRef = useRef(null) // not being used
  // const canvas = canvasRef.current

  useEffect(() => {
    const newSocket = setupWebSocket(setSimulationData);
    setSocket(newSocket);
    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, []); 
  
  return (
    <Box pt={2}>
    <ParametersForm socket={socket}/>
    <BubbleChart ref={canvasRef} simulationData={simulationData} x={x} y={y}/>
    </Box>
  );
};