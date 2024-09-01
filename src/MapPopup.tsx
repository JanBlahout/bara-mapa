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
      <h1>{item.popUp}</h1>
      <span>Adresa</span>

      <a
        // href={`https://www.google.com/maps?q=${item.geocode[0]},${item.geocode[1]}`}
        href={`https://www.google.com/maps/place/Pra%C5%BEsk%C3%BD+orloj/@50.0870416,14.4204803,503m/data=!3m1!1e3!4m12!1m5!3m4!2zNTDCsDA1JzEzLjYiTiAxNMKwMjUnMTYuOSJF!8m2!3d50.0871067!4d14.4213596!3m5!1s0x470b94e939c02f49:0xf17b44b25aa20696!8m2!3d50.0870215!4d14.4207065!16zL20vMDMydDBm?entry=ttu`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Google odkaz
      </a>

      <a href="#">Instagram</a>

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
