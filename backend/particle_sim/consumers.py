import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .simulation.simulation import simulate

class SimulationConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.accept()
        # await self.send_simulation_data()
        
    async def disconnect(self, close_code):
        if hasattr(self, 'task'):
            self.task.cancel()
        self.close()

    async def receive(self, text_data):
        simulation_params = json.loads(text_data)
        x = int(simulation_params.get('x'))
        y = int(simulation_params.get('y'))
        particles = int(simulation_params.get('particles'))
        foods = int(simulation_params.get('foods'))

        print('simulation params:', simulation_params)
        await self.send_simulation_data(x ,y, particles, foods)
        self.close()

    async def send_data_to_frontend(self, data):
        # Send the data to the WebSocket
        await self.send(text_data=json.dumps({
            'type': 'send_data',
            'payload': {'message': data},
        }))

    async def send_simulation_data(self, x, y, particles, foods):
        for tick_data in simulate(x, y, particle_no=particles, food_no=foods):
            await asyncio.sleep(0.05)
            await self.send_data_to_frontend(tick_data)
        print('terminado')

