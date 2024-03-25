import { useEffect, useState, useRef, forwardRef  } from "react";

const log = (...args) => console.log.apply(null, ["GoogleMap -->", ...args]);

export default function GoogleMap({ lat, lng, zoom, addMarker }) {
  const map = useRef(null);
  const mapDiv = useRef(null);
  const [cCoordinates, setCCoordinates] = useState({ latC: -1, lngC: 1 });
  const [markers, setMarkers] = useState([]);
  
  useEffect(() => {
    async function createMap() {
      console.log("creating map...");
      const { Map } = await google.maps.importLibrary("maps");
      console.log("Map library loaded");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      console.log("AdvancedMarkerElement library loaded");
      map.current = new Map(mapDiv.current, {
        center: { lat, lng },
        zoom: 8,
        mapId: 'ea7f33ffc97415b3',
        addMarker: ""
      });
      
      extractCenterLatlng();
      
      const marker1 = new AdvancedMarkerElement({
        map: map.current,
        position: { lat: -25.344, lng: 131.031 },
        title: "Uluru",
      });

      const marker2 = new AdvancedMarkerElement({
        map: map.current,
        position: { lat: 32.0042938, lng: 34.7615399 },
        title: "Tel-Aviv",
      });
      
      // Set initial markers
      setMarkers([marker1, marker2]);
    }
    createMap();
  }, [lat, lng]);
  
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

  const extractCenterLatlng = () => {
    if (map.current) {
        map.current.addListener("center_changed", () => {
          const center = map.current.getCenter();
          const latC = center.lat();
          const lngC = center.lng();
          console.log("Center Latitude:", latC);
          console.log("Center Longitude:", lngC);
          setCCoordinates({ latC, lngC });
        });
      }
    };

   return <div ref={mapDiv} className="map-box" />;
}