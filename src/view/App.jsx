import { useState, useRef } from "react";
import TopBar from "./TopBar";
import GoogleMap from "./GoogleMap";

// utility function
const log = (...args) => console.log.apply(null, ["App -->", ...args]);

export default function App() {

  const input = useRef(null);
  const [zoom, setZoom] = useState(8);
  const [latlng, setLatlng] = useState({
    lat: -34.397,
    lng: 150.644,
  });

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
          default:
          alert("Location not supported");
    }
  }

  function onZoomChange(){
    setZoom(Number(input.current.value))
  }

    log(latlng);
    return (
      <div className="app">
        <TopBar>Google Maps Example in React</TopBar>
        <div className="hbox mb20">
          <button onClick={() => reposition("tel aviv")}>Tel Aviv</button>
          <button onClick={() => reposition("london")}>London</button>
          <button onClick={() => reposition("paris")}>Paris</button>
          <input
            ref={input}
            type="number"
            min="8"
            max="16"
            placeholder="8"
            onChange={ onZoomChange }
          />
        </div>
            <GoogleMap
             lat={latlng.lat} 
             lng={latlng.lng}
             zoom={zoom}
            />
      </div>
    );
  
}
