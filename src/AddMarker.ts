import { Dispatch, SetStateAction } from 'react';
import { useMapEvents } from 'react-leaflet';

type MarkerType = {
  geocode: [number, number];
  popUp: string;
};

interface AddMarkerProps {
  setMarkers: Dispatch<SetStateAction<MarkerType[]>>;
}

function AddMarker({ setMarkers }: AddMarkerProps) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const newPopUpText = prompt('Enter popup text:');
      if (!newPopUpText) return;
      setMarkers((current) => [
        ...current,
        { geocode: [lat, lng], popUp: newPopUpText },
      ]);
    },
  });

  return null;
}

export default AddMarker;
