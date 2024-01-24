from rest_framework.viewsets import ModelViewSet
from ..models import Iss
from .serializers import IssSerializer
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView
from rest_framework import authentication, permissions
from rest_framework.response import Response



class IssViewSet(ModelViewSet):
    serializer_class = IssSerializer
    queryset = Iss.objects.all().order_by('-id')[0:400]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        last_entry = queryset[0]
        locations = []
        [locations.append({'lat': item.latitude, 'lng': item.longitude}) for item in queryset]

        serialized_last_entry = self.get_serializer(last_entry)
        last_entry = serialized_last_entry.data
        custom_data = {
            'last_entry': last_entry,
            'locations' : locations
        }
        return Response(custom_data)


    
    # queryset = Iss.objects.filter(id=Iss.objects.last().id) or None
    # def get_queryset(self):
    #     # Return a queryset based on your specific condition.
    #     # In this example, I'm getting the last Iss object.
    #     return Iss.objects.filter(id=Iss.objects.last().id) if Iss.objects.last() else Iss.objects.none()
    # queryset = Iss.objects.last()
    # def list(self, request, *args, **kwargs):
    #     print(type(request))
    #     print(request.data)
    #     # Your custom logic for handling GET requests for the entire collection
    #     return super().list(request, *args, **kwargs)
    
    
    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()  # Retrieve the instance to be deleted
    #     serializer = self.get_serializer(instance)

    #     # Print the JSON data before deleting
    #     print(f"Deleting the following data:\n{serializer.data}")

    #     # Call the parent class's destroy method to perform the actual deletion
    #     response = super().destroy(request, *args, **kwargs)

    #     # You can also print additional information after deletion if needed
    #     print(f"Data deleted successfully!")

    #     return response
    
    # def create(self, request, *args, **kwargs):
    #     # Print the data received from the frontend
    #     print(f"Data received from frontend:\n{request.data}")

    #     # Call the parent class's create method to perform the actual creation
    #     response = super().create(request, *args, **kwargs)

    #     # You can also print additional information after creation if needed
    #     print(f"New entry created successfully!")

    #     return response

