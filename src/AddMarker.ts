import { useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

function AddMarker() {
  const navigate = useNavigate();

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      navigate(`/newMarker/${lat}/${lng}`);
    },
  });

  return null;
}

export default AddMarker;
