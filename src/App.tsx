import { useEffect, useMemo, useState } from 'react';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import './App.css';
import AddMarker from './AddMarker';
import SearchControl from './SearchControl';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import RestaurantCard from './RestaurantCard';
import MapPopup from './MapPopup';

export type MarkerType = {
  geocode: [number, number];
  popUp: string;
  id: string;
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
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [view, setView] = useState<{ center: [number, number]; zoom: number }>({
    center: [50.08710669808234, 14.421359586553326],
    zoom: 13,
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const markersCollectionRef = useMemo(() => collection(db, 'podniky'), []);
  const getMarkers = async () => {
    try {
      const response = await getDocs(markersCollectionRef);
      const data = response.docs.map((doc) => {
        const docData = doc.data();
        return {
          geocode: docData.lokace as [number, number], // Ensure the type matches
          popUp: docData.nazev as string, // Ensure the type matches
          id: doc.id,
        } as MarkerType;
      });
      setMarkers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMarkers();
  }, [markersCollectionRef]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSidebarClick = (geocode: [number, number]) => {
    setView({ center: geocode, zoom: 20 });
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        {markers.map((marker) => (
          <RestaurantCard
            geocode={marker.geocode}
            popUp={marker.popUp}
            id={marker.id}
            handleSidebarClick={() => handleSidebarClick(marker.geocode)}
            key={marker.id}
          />
        ))}
      </div>
      <div className="map-container">
        <MapContainer center={view.center} zoom={view.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MarkerClusterGroup chunkedLoading>
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.geocode}>
                <Popup>
                  <MapPopup loggedIn={loggedIn} item={marker} />
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          <ChangeView center={view.center} zoom={view.zoom} />
          {loggedIn && <AddMarker />}
          <SearchControl />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
