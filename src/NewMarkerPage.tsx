import { useParams, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from './config/firebase';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';

const markersCollectionRef = collection(db, 'podniky');

const addNewMarker = async (
  nazev: string,
  popis: string,
  lokace: [number, number],
  googleLink: string,
  instagramLink: string
) => {
  try {
    await addDoc(markersCollectionRef, {
      nazev,
      popis,
      lokace,
      userId: auth.currentUser?.uid,
      googleLink,
      instagramLink,
    });
  } catch (error) {
    console.log(error);
  }
};

function NewMarkerPage() {
  const { lat, lng } = useParams<{ lat: string; lng: string }>();
  const [nazev, setNazev] = useState('');
  const [popis, setPopis] = useState('');
  const [googleLink, setGoogleLink] = useState('');
  const [instagramLink, setIntagramLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nazev || !popis || !lat || !lng) return;

    try {
      await addNewMarker(
        nazev,
        popis,
        [parseFloat(lat), parseFloat(lng)],
        googleLink,
        instagramLink
      );
      navigate('/');
    } catch (error) {
      console.log('Error creating new point', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-96 items-center text-center mx-auto my-10">
      <h1>Add Marker</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div>
          <label htmlFor="nazev">Nazev:</label>
          <Input
            id="nazev"
            name="nazev"
            type="text"
            required
            onChange={(e) => setNazev(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="popis">Popis:</label>
          <Textarea
            id="popis"
            name="popis"
            onChange={(e) => setPopis(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="popis">Google odkaz:</label>
          <Input
            id="google"
            name="google"
            // type="url"
            required
            onChange={(e) => setGoogleLink(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="popis">Instagram odkaz:</label>
          <Input
            id="instagram"
            name="instagram"
            // type="url"
            required
            onChange={(e) => setIntagramLink(e.target.value)}
          />
        </div>

        <Button
          onClick={() => {
            navigate('/');
          }}
        >
          Zpět
        </Button>
        <Button type="submit">Přidat</Button>
      </form>
    </div>
  );
}

export default NewMarkerPage;
