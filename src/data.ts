type MarkerType = {
  geocode: [number, number];
  popUp: string;
};

export const initialMarkers: MarkerType[] = [
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
  {
    geocode: [50.230941939850716, 12.85181522369385],
    popUp: 'Pop 3',
  },
];
