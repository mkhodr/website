
export const setupWebSocket = (setSimulationData) => {
    const socket = new WebSocket('ws://localhost:8000/ws/simulation/');
  
    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };
  
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const message = data.payload.message;
      setSimulationData(message);
    };
  
    return socket;
  };