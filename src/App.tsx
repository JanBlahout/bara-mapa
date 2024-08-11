import { useEffect, useState } from 'react';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import './App.css';
import AddMarker from './AddMarker';
import SearchControl from './SearchControl';

import { initialMarkers } from './data';
import Auth from './Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';

type MarkerType = {
  geocode: [number, number];
  popUp: string;
};

const customIcon = new Icon({
  iconUrl:
    'https://as2.ftcdn.net/v2/jpg/01/34/46/07/1000_F_134460749_hZOa8D3NVvPDlJx7RV8nFoLXT0JDNpTu.jpg',
  iconSize: [38, 38],
});

function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function App() {
  const [markers, setMarkers] = useState<MarkerType[]>(initialMarkers);
  const [view, setView] = useState<{ center: [number, number]; zoom: number }>({
    center: [48.8566, 2.3522],
    zoom: 13,
  });

  const markersCollectionRef = collection(db, 'podniky');

  useEffect(() => {
    const getMarkers = async () => {
      try {
        const response = await getDocs(markersCollectionRef);
        const data = response.docs.map((doc) => {
          const docData = doc.data();
          return {
            geocode: docData.lokace as [number, number], // Ensure the type matches
            popUp: docData.nazev as string, // Ensure the type matches
          } as MarkerType;
        });
        console.log(data);
        setMarkers([...initialMarkers, ...data]);
      } catch (error) {
        console.log(error);
      }
    };

    getMarkers();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSidebarClick = (geocode: [number, number]) => {
    setView({ center: geocode, zoom: 15 }); // Adjust zoom level as needed
  };

  return (
    <div className="app-container">
      <Auth />
      <div className="sidebar">
        <ul>
          {markers.map((marker, index) => (
            <li key={index} onClick={() => handleSidebarClick(marker.geocode)}>
              <h2>{marker.popUp}</h2>
              <p>Coordinates: {marker.geocode.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="map-container">
        <MapContainer center={view.center} zoom={view.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MarkerClusterGroup chunkedLoading>
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.geocode} icon={customIcon}>
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          <ChangeView center={view.center} zoom={view.zoom} />
          {loggedIn && <AddMarker setMarkers={setMarkers} />}
          <SearchControl />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
