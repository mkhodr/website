import { Card, CardBody, CardHeader } from '@chakra-ui/react'
import React from 'react'


function ParticleStatBox({label, value}) {
  return (
    <Card w={'150px'} pb={1}>
        <CardHeader fontSize={'1vw'} py={0}>{label.toUpperCase()}</CardHeader>
        <CardBody fontSize={'1.2vw'} py={0}>{Math.round(value * 100) / 100}</CardBody>

    </Card>
  )
}

export default ParticleStatBox