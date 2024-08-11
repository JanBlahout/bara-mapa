import { useMapEvents } from 'react-leaflet';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from './config/firebase';

const markersCollectionRef = collection(db, 'podniky');
const addNewmarker = async (
  nazev: string,
  popis: string,
  lokace: [number, number]
) => {
  try {
    await addDoc(markersCollectionRef, {
      nazev,
      popis,
      lokace,
      userId: auth.currentUser?.uid,
    });
  } catch (error) {
    console.log(error);
  }
};

function AddMarker() {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const nazev = prompt('Nazev:');
      if (!nazev) return;
      const popis = prompt('Popis');
      if (!nazev || !popis) return;
      try {
        addNewmarker(nazev, popis, [lat, lng]);
      } catch (error) {
        console.log('error creating new point', error);
      }
    },
  });

  return null;
}

export default AddMarker;
