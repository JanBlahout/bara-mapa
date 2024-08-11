import { useParams, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from './config/firebase';
import { useState } from 'react';

const markersCollectionRef = collection(db, 'podniky');

const addNewMarker = async (
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

function NewMarkerPage() {
  const { lat, lng } = useParams<{ lat: string; lng: string }>();
  const [nazev, setNazev] = useState('');
  const [popis, setPopis] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nazev || !popis || !lat || !lng) return;

    try {
      await addNewMarker(nazev, popis, [parseFloat(lat), parseFloat(lng)]);
      navigate('/');
    } catch (error) {
      console.log('Error creating new point', error);
    }
  };

  return (
    <div>
      <h1>Add Marker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nazev">Nazev:</label>
          <input
            id="nazev"
            name="nazev"
            type="text"
            required
            onChange={(e) => setNazev(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="popis">Popis:</label>
          <input
            id="popis"
            name="popis"
            type="text"
            required
            onChange={(e) => setPopis(e.target.value)}
          />
        </div>
        <button type="submit">Add Marker</button>
      </form>
    </div>
  );
}

export default NewMarkerPage;
