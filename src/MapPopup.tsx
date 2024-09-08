import { MarkerType } from './App';
import { Button } from './components/ui/button';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './config/firebase';

type MapPopupProps = {
  item: MarkerType;
  loggedIn: boolean;
};

const deleteRestaurant = async (id: string) => {
  const podnik = doc(db, 'podniky', id);
  try {
    await deleteDoc(podnik);
  } catch (error) {
    console.log('error deleting', error);
  }
};

// const updateRestaurant = async (id: string) => {
//   const podnik = doc(db, 'podniky', id);
//   try {
//     const novyNazev = prompt('Novy nazev:');
//     await updateDoc(podnik, { nazev: novyNazev });
//     getMarkers();
//   } catch (error) {
//     console.log('error deleting', error);
//   }
// };

function MapPopup(props: MapPopupProps) {
  const { item, loggedIn } = props;
  return (
    <div className="flex flex-col gap-3">
      <h1>{item.nazev}</h1>
      <span>{item.popis}</span>

      {item.googleLink && (
        <a href={item.googleLink} target="_blank" rel="noopener noreferrer">
          Google odkaz
        </a>
      )}
      {item.instagramLink && (
        <a href={item.instagramLink} target="_blank" rel="noopener noreferrer">
          Moje návštěva
        </a>
      )}

      {loggedIn && (
        <Button
          onClick={() => {
            deleteRestaurant(item.id);
          }}
        >
          Delete
        </Button>
      )}
    </div>
  );
}

export default MapPopup;
