import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

function SearchControl() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: 'bar',
      showMarker: false,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
}

export default SearchControl;
