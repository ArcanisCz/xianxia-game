import { Location, LocationDef } from 'core/location';
import { activities, ActivityKeys } from './activities';

export type LocationKeys = 'empty' | 'graveyard' | 'sect';

const definitions: LocationDef<LocationKeys, ActivityKeys>[] = [
  {
    id: 'graveyard',
    name: 'Graveyard',
    activities: ['raid'],
  },
  {
    id: 'sect',
    name: 'Sect',
    activities: ['meditate'],
  },
];

export type GameLocation = Location<LocationKeys, ActivityKeys>;

export const locations: {
  [key in LocationKeys]: GameLocation;
} = definitions.reduce((acc, def) => {
  acc[def.id] = new Location({
    id: def.id,
    name: def.name,
    activities: def.activities.map(a => activities[a]),
  });

  return acc;
}, {} as { [key in LocationKeys]: GameLocation });
