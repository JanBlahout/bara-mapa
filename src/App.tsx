import { useEffect, useMemo, useState } from 'react';
// import { Icon } from 'leaflet';
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
import MapPopup from './MapPopup';
import { Button } from './components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import RestaurantList from './RestaurantList';

export type MarkerType = {
  // geocode: [number, number];
  // popUp: string;
  id: string;
  nazev: string;
  popis: string;
  lokace: [number, number];
  googleLink?: string;
  instagramLink?: string;
};

// const customIcon = new Icon({
//   iconUrl:
//     'https://as2.ftcdn.net/v2/jpg/01/34/46/07/1000_F_134460749_hZOa8D3NVvPDlJx7RV8nFoLXT0JDNpTu.jpg',
//   iconSize: [38, 38],
// });

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
  const [isListOpen, setIsListOpen] = useState(false);
  const [filter, setFilter] = useState('');

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
          lokace: docData.lokace,
          nazev: docData.nazev,
          popis: docData.popis,
          instagramLink: docData.instagramLink,
          googleLink: docData.googleLink,
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
    setIsListOpen(false);
  };

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const filteredMarkers = markers.filter((marker) => {
    const filterText = filter.toLowerCase();
    return (
      marker.nazev.toLowerCase().includes(filterText) ||
      marker.popis.toLowerCase().includes(filterText)
    );
  });

  console.log(filteredMarkers);

  return (
    <div className="app-container">
      <div className="sidebar">
        <RestaurantList
          filter={filter}
          setFilter={setFilter}
          filteredMarkers={filteredMarkers}
          handleClick={handleSidebarClick}
        />
      </div>
      <div className="map-container">
        <MapContainer center={view.center} zoom={view.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MarkerClusterGroup chunkedLoading>
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.lokace}>
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

      <div className={`fullscreen-list ${isListOpen ? 'active' : ''}`}>
        <RestaurantList
          filter={filter}
          setFilter={setFilter}
          filteredMarkers={filteredMarkers}
          handleClick={handleSidebarClick}
        />
      </div>
      <Button className="mobile-menu" onClick={toggleList}>
        {isListOpen ? (
          <ChevronDown className="w-10 h-10" />
        ) : (
          <ChevronUp className="w-10 h-10" />
        )}
      </Button>
    </div>
  );
}

export default App;
