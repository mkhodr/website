import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

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


function StatBox({name, number, unit}) {
  return (
    <>
    <StatLabel fontSize={'calc(8px + 0.190625vw)'}>{name.toUpperCase()}</StatLabel>
    <StatNumber fontSize={'calc(10px + 0.70625vw)'}>{number}</StatNumber>
    <StatHelpText fontSize={'calc(6px + 0.390625vw)'}>{unit}</StatHelpText>
    </>
  );
}

export default Statistics

