import { Dispatch, SetStateAction } from 'react';
import { useMapEvents } from 'react-leaflet';

type MarkerType = {
  geocode: [number, number];
  popUp: string;
};

interface AddMarkerProps {
  setMarkers: Dispatch<SetStateAction<MarkerType[]>>;
  loggedIn: boolean;
}

function AddMarker({ setMarkers, loggedIn }: AddMarkerProps) {
  useMapEvents({
    click(e) {
      if (!loggedIn) {
        // alert('You must be logged in to add a marker.');
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

export default AddMarker;
