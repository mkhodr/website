import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import StatBox from "./StatBox";

function Statistics({array}) {
    return(
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
  );}

export default Statistics

