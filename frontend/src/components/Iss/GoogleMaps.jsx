import { useEffect, useRef } from "react";


async function Map({mapRef}) { 
    const googleKey = import.meta.env.VITE_GOOGLE_API_KEY; 

    
    useEffect(() => {
        initMap()
        
        return () => {
            
        }
    }, [])
    
    async function initMap() {
        (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
          key: googleKey,
          // Add other bootstrap parameters as needed, using camel case.
          // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
        });
        const { Map } = await google.maps.importLibrary('maps');
        if (!mapRef.current) {
          // If the map doesn't exist, create it
          mapRef.current = new Map(document.getElementById('map'), {
            zoom: 4,
            // center: {lat: parseFloat(frontResult.latitude), lng: parseFloat(frontResult.longitude)},
            center: {lat: 0, lng: 0},
            mapId: 'DEMO_MAP_ID',
          });
        } else {
          console.log(' map already generated')
        }
    }
}


async function updateMarker({lastEntry, markerRef, mapRef}) {  
    const position = {lat: lastEntry.latitude, lng: lastEntry.longitude}
    if (markerRef.current) {
        markerRef.current.setMap(null)
        markerRef.current = null;
    }
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
    // If the marker doesn't exist, create it
    markerRef.current = new AdvancedMarkerElement({
    map: mapRef.current,
    position,
    title: 'ISS',
    });
    mapRef.current.setCenter(position)
}

async function addLine({locations, lineRef, mapRef}){
if (lineRef.current) {
  lineRef.current.setMap(null)
}
lineRef.current = new google.maps.Polyline({
  path: locations,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1,
  strokeWeight: 1
});
lineRef.current.setMap(mapRef.current);
}

function removeLine({lineRef}) {
    if (lineRef.current) {
        lineRef.current.setMap(null)
      }
}

export { Map, addLine, removeLine, updateMarker}

