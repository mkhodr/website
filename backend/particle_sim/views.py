
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync

# class SimulationView(APIView):
#     def get(self, request):
#         simulation_state = ['a', 'b', 'c']
#         print('passando na view')
#         # Send the updated simulation data through WebSocket
#         channel_layer = get_channel_layer()
#         async_to_sync(channel_layer.group_send)(
#             'simulation_group',
#             {'type': 'send_simulation_data', 'simulation_data': simulation_state}
#         )

#         return Response(simulation_state)