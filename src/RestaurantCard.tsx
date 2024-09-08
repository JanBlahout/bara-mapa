import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarkerType } from './App';

type RestaurantCardProps = {
  handleSidebarClick: (geocode: [number, number]) => void;
  marker: MarkerType;
};

function RestaurantCard({ marker, handleSidebarClick }: RestaurantCardProps) {
  return (
    <Card
      onClick={() => handleSidebarClick([marker.lokace[0], marker.lokace[1]])}
      className="hover:bg-slate-200 cursor-pointer"
    >
      <CardHeader>
        <CardTitle>{marker.nazev}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{marker.popis}</p>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;
