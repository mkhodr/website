from .models import Iss
from celery import shared_task
import requests

@shared_task
def query_iss():
    iss_api_request = requests.get('https://api.wheretheiss.at/v1/satellites/25544')
    iss_json = iss_api_request.json()
    # removing unused keys
    keys_to_remove = ['daynum', 'footprint', 'id', 'name']
    for key in keys_to_remove:
        iss_json.pop(key, None)
    iss_entry = Iss(**iss_json)
    iss_entry.save()
    print(f'salvo')