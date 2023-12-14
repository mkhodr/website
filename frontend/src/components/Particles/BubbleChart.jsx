import { Box } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, } from 'chart.js';
import { Bubble, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2';
import { useColorModeValue, Button } from "@chakra-ui/react";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);


// custom coloring
//// Consegui fazer a responsividade dos componentes mas preciso arrumar no Particles.jsx 
/// um jeito de fazer o canvas resize sem precisar de dados



const BubbleChart = React.forwardRef(({ simulationData, x, y }, ref) => {

  const [tick, setTick] = useState(0)

  const chartBg = useColorModeValue('gray.100', 'gray.900')
  const [aspectRatio, setAspectRatio] = useState(undefined)
  const canvas = ref.current

  
  function resizeCanvas(canvas) {
    if (canvas) {
      // Resize the chart when the window is resized
      canvas.resize();
      // chart.render();
    }
  }
  
  
  // onClick hook for chart data
  const onClick = (event) => {
    console.log(getElementAtEvent(ref.current, event));
  }
  
  // useEffect for handling width change
  useEffect(() => {
    setAspectRatio(window.innerWidth < 760 ? 1 : 2)
    setTick(simulationData.tick)
    return () => {
      resizeCanvas(canvas)
    }
  }, [simulationData])
  


  /// DATA ================
  const data = {
    datasets: [
    {
      label: "Particles",
      data: simulationData.particles.x.map((_, i) => ({
              x: simulationData.particles.x[i],
              y: simulationData.particles.y[i],
              r: simulationData.particles.r[i],
              velocity: simulationData.particles.velocity[i],
            })),
      backgroundColor: 'rgba(0, 99, 255, 0.5)',
      animation: {
        duration: 10, // Set the duration of the default transitions in milliseconds
      },

  },
    {
      label: "Foods",
      data: simulationData.foods.x.map((_, i) => ({
        x: simulationData.foods.x[i],
        y: simulationData.foods.y[i],
        r: simulationData.foods.r[i],
      })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      transitions: false,
    },
  ]};
  /// DATA ================

  const options = {
    scales: {
      x: {
        display: false,
        beginAtZero: true,  // Disable auto-scaling for the x-axis
        suggestedMax: x,
      },
      y: {
        display: false,
        beginAtZero: true,  // Disable auto-scaling for the y-axis
        suggestedMax: y
      },
    },
    aspectRatio: aspectRatio !== undefined ? aspectRatio : undefined,
  };



  return (

      <Box bg={chartBg}>
        {tick}
        <Bubble
          ref={ref}
          data={data}
          options={options}
          onClick={onClick}
        />
      </Box>

  );
})


export default BubbleChart