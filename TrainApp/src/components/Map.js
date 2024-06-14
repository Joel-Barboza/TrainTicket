import React, { useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import ReactDOM from 'react-dom/client';
import RoutesGraph from './RoutesGraph'; // Import the RoutesGraph component

const libraries = ['places'];

const mapContainerStyle = {
  width: '700px',
  height: '700px',
  position: "relative",
  alignSelf: "center"
};

const center = {
  lat: 9.93333,
  lng: -84.08333
};

const bounds = {
  north: 10.03333,
  south: 9.83333,
  east: -83.98333,
  west: -84.18333,
};

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'API_KEY', 
    libraries,
  });

  const mapRef = useRef(null);
  const overlayRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    const swBound = new window.google.maps.LatLng(bounds.south, bounds.west);
    const neBound = new window.google.maps.LatLng(bounds.north, bounds.east);
    const overlayBounds = { sw: swBound, ne: neBound };

    class CustomOverlay extends window.google.maps.OverlayView {
      constructor(bounds) {
        super();
        this.bounds = bounds;
        this.div = null;
        this.routesGraphRoot = null;
      }

      onAdd() {
        const div = document.createElement('div');
        div.style.borderStyle = 'none';
        div.style.borderWidth = '0px';
        div.style.position = 'absolute';

        this.div = div;

        const panes = this.getPanes();
        panes.overlayLayer.appendChild(div);

        this.routesGraphRoot = ReactDOM.createRoot(div);
        this.routesGraphRoot.render(<RoutesGraph />);
      }

      draw() {
        const overlayProjection = this.getProjection();
        const sw = overlayProjection.fromLatLngToDivPixel(this.bounds.sw);
        const ne = overlayProjection.fromLatLngToDivPixel(this.bounds.ne);

        if (this.div) {
          this.div.style.left = `${sw.x}px`;
          this.div.style.top = `${ne.y}px`;
          this.div.style.width = `${ne.x - sw.x}px`;
          this.div.style.height = `${sw.y - ne.y}px`;
        }
      }

      onRemove() {
        if (this.div && this.routesGraphRoot) {
          this.routesGraphRoot.unmount();
          this.div.parentNode.removeChild(this.div);
          this.div = null;
        }
      }

      hide() {
        if (this.div) {
          this.div.style.visibility = 'hidden';
        }
      }

      show() {
        if (this.div) {
          this.div.style.visibility = 'visible';
        }
      }

      toggle() {
        if (this.div) {
          if (this.div.style.visibility === 'hidden') {
            this.show();
          } else {
            this.hide();
          }
        }
      }

      toggleDOM(map) {
        if (this.getMap()) {
          this.setMap(null);
        } else {
          this.setMap(map);
        }
      }
    }

    overlayRef.current = new CustomOverlay(overlayBounds);
    overlayRef.current.setMap(map);
  }, []);

  const toggleOverlay = () => {
    if (overlayRef.current) {
      overlayRef.current.toggle();
    }
  };

  const toggleDOMOverlay = () => {
    if (overlayRef.current) {
      overlayRef.current.toggleDOM(mapRef.current);
    }
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div className='map-container'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
        // mapTypeId="satellite"
        onLoad={onMapLoad}
      />
      <div className="button-container">
        <button className="custom-map-control-button" onClick={toggleOverlay}>
          Toggle
        </button>
        <button className="custom-map-control-button" onClick={toggleDOMOverlay}>
          Toggle DOM Attachment
        </button>
      </div>
    </div>
  );
}

export default App;
