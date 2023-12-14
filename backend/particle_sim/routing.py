from django.urls import path, re_path
from .consumers import SimulationConsumer


websocket_urlpatterns = [
    re_path(r'ws/simulation/$', SimulationConsumer.as_asgi()),
]