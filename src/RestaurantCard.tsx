import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MarkerType } from './App';

type RestaurantCardProps = MarkerType & {
  handleSidebarClick: (geocode: [number, number]) => void;
};

function RestaurantCard({
  geocode,
  popUp,
  handleSidebarClick,
}: RestaurantCardProps) {
  return (
    <Card
      onClick={() => handleSidebarClick([geocode[0], geocode[1]])}
      className="hover:bg-slate-200 cursor-pointer"
    >
      <CardHeader>
        <CardTitle>{popUp}</CardTitle>
        <CardDescription>Adresa</CardDescription>
      </CardHeader>
      <CardContent>Ikona restaurace</CardContent>
    </Card>
  );
}

export default RestaurantCard;
