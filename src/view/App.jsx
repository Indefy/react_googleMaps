import { useState, useRef } from "react";
import TopBar from "./TopBar";
import GoogleMap from "./GoogleMap";

const log = (...args) => console.log.apply(null, ["App -->", ...args]);

export default function App() {
  const zoomInput = useRef(null);
  const markerTitleInput = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [zoom, setZoom] = useState(8);
  const [latlng, setLatlng] = useState({
    lat: -34.397,
    lng: 150.644,
  });
  const googleMapRef = useRef(null);

  
  function reposition(city) {
    switch (city) {
      case "tel aviv":
        setLatlng({ lat: 32.0042938, lng: 34.7615399 });
        break;
        case "london":
          setLatlng({ lat: 51.509865, lng: -0.118092 });
          break;
          case "paris":
            setLatlng({ lat: 48.864716, lng: 2.349014 });
            break;
            case "uluru":
              setLatlng({ lat: -25.344, lng: 131.031 });
              break;
              default:
                alert("Location not supported");
              }
            }
            
            function onZoomChange(){
              setZoom(Number(zoomInput.current.value))
            }

      function addMarker() {
        const markerTitle = `Marker (${latlng.lat}, ${latlng.lng})`; 
        const [lat, lng] = [latlng.lat, latlng.lng]; 
        console.log("Marker Title:", markerTitle);
        console.log("Parsed lat:", lat, "Parsed lng:", lng);
        
     if (!isNaN(lat) && !isNaN(lng)) {
        const newMarker = {
        position: { lat, lng },
        title: markerTitle,
      };
        setMarkers([...markers, newMarker]);
          if(googleMapRef.current) {
          googleMapRef.current.addMarker(newMarker);
      }
      } else {
          alert("Invalid latitude and longitude values. Please enter valid values.");
      }
  }
    
  log(latlng);
  return (
    <div className="app">
      <TopBar>Google Maps Example in React</TopBar>
      <div className="hbox mb20">
        <button onClick={() => reposition("tel aviv")}>Tel Aviv</button>
        <button onClick={() => reposition("london")}>London</button>
        <button onClick={() => reposition("paris")}>Paris</button>
        <button onClick={() => reposition("uluru")}>Uluru</button>
        <input
          ref={zoomInput}
          type="number"
          min="8"
          max="16"
          placeholder="8"
          onChange={onZoomChange}
        />
      </div>
      <br />
      <div className="markerBox">
        <p>Marker Title: </p>
        <input ref={markerTitleInput} type="text" placeholder="Marker Title (lat: -34.397, lng: 150.644)" />
        <select name="Crs" id="cars">
          <optgroup label="Type">
            <option value="Null">marker type</option>
            <option value="saab">Barbecue</option>
            <option value="Null">Buffet</option>
            <option value="saab">Brasserie</option>
            <option value="Null">Cafe</option>
            <option value="saab">Dinner</option>
            <option value="Null">Ethnic</option>
            <option value="saab">Kosher</option>
          </optgroup>
        </select>
        <button onClick={addMarker}>Add Marker</button>
      </div>
      <GoogleMap
        ref={googleMapRef}
        lat={latlng.lat}
        lng={latlng.lng}
        zoom={zoom}
        addMarker={addMarker}
      />
    </div>
  );
}