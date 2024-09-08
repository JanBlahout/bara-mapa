import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { XIcon } from 'lucide-react';
import { MarkerType } from './App';
import RestaurantCard from './RestaurantCard';

type RestaurantListProps = {
  filter: string;
  setFilter: (value: string) => void;
  filteredMarkers: MarkerType[];
  handleClick: (geocode: [number, number]) => void;
};

function RestaurantList({
  filter,
  setFilter,
  filteredMarkers,
  handleClick,
}: RestaurantListProps) {
  return (
    <>
      <div className="relative w-full">
        <Input
          placeholder="Filter..."
          value={filter ?? ''}
          onChange={(event) => setFilter(String(event.target.value))}
        />
        {filter.length > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            onClick={() => {
              setFilter('');
            }}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
        ) : null}
      </div>
      {filteredMarkers.map((marker) => (
        <RestaurantCard
          marker={marker}
          handleSidebarClick={() => handleClick(marker.lokace)}
          key={marker.id}
        />
      ))}
    </>
  );
}

export default RestaurantList;
