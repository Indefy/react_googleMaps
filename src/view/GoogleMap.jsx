import { useEffect, useRef } from "react";
const log = (...args) => console.log.apply(null, ["GoogleMap -->", ...args]);

export default function GoogleMap({ lat, lng ,zoom}) {
  const map = useRef(null);
  const mapDiv = useRef(null);
  const markerPosition = { lat: -25.344, lng: 131.031 };

  
  async function createMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    map.current = new Map(mapDiv.current, {
      center: { lat, lng },
      zoom: 8,
      mapId: "DEMO_MAP_ID"
    });
    
    const marker = new AdvancedMarkerElement({
     map: map.current,
     position: markerPosition,
     title: "Uluru",
    });
  }
  
  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    if(!map.current) return;
    log("useEffect >>>>");
    log("lat:", lat);
    log("lng:", lng);
    log("zoom:", zoom);
    log("mapDiv:", mapDiv);
    log("<<<< useEffect");
    map.current.setCenter({ lat, lng });
    }, [lat, lng]);

    useEffect(() => {
    if (map.current) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);
  
  return <div ref={mapDiv} className="map-box" />;
  
}



  // useEffect(() => {
  //   if  (map.current) {
  //     map.current.;
  //   }
  // }, []);