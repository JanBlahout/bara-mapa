import { Dispatch, SetStateAction, useState } from 'react';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

type MarkerType = {
  geocode: [number, number];
  popUp: string;
};

const initialMarkers: MarkerType[] = [
  {
    geocode: [48.86, 2.3522],
    popUp: 'Pop 1',
  },
  {
    geocode: [48.85, 2.3522],
    popUp: 'Pop 2',
  },
  {
    geocode: [48.855, 2.34],
    popUp: 'Pop 3',
  },
];

const customIcon = new Icon({
  iconUrl:
    'https://as2.ftcdn.net/v2/jpg/01/34/46/07/1000_F_134460749_hZOa8D3NVvPDlJx7RV8nFoLXT0JDNpTu.jpg',
  iconSize: [38, 38],
});

interface AddMarkerProps {
  setMarkers: Dispatch<SetStateAction<MarkerType[]>>;
  loggedIn: boolean;
}

function AddMarker({ setMarkers, loggedIn }: AddMarkerProps) {
  useMapEvents({
    click(e) {
      if (!loggedIn) {
        alert('You must be logged in to add a marker.');
        return;
      }
      const { lat, lng } = e.latlng;
      const newPopUpText = prompt('Enter popup text:');
      setMarkers((current) => [
        ...current,
        { geocode: [lat, lng], popUp: newPopUpText || 'No popup text' },
      ]);
    },
  });

  return null;
}

function App() {
  const [markers, setMarkers] = useState<MarkerType[]>(initialMarkers);

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13}>
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <AddMarker setMarkers={setMarkers} loggedIn={true} />
    </MapContainer>
  );
}

export default App;
