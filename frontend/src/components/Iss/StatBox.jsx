import { StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'
import React from 'react'


function StatBox({name, number, unit}) {
  return (
    <>
    <StatLabel fontSize={'calc(8px + 0.190625vw)'}>{name.toUpperCase()}</StatLabel>
    <StatNumber fontSize={'calc(10px + 0.70625vw)'}>{number}</StatNumber>
    <StatHelpText fontSize={'calc(6px + 0.390625vw)'}>{unit}</StatHelpText>
    </>
  );
}

export default StatBox