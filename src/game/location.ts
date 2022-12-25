import { Location, LocationDef } from 'core/location';
import { activities, ActivityKeys } from './activities';
import { ActivityTagKeys } from './activityTags';

export type LocationKeys = 'empty' | 'graveyard' | 'sect';

// TODO: how to type error non existing location and also duolicate?
const definitions: LocationDef<LocationKeys, ActivityKeys>[] = [
  { id: 'empty', name: 'Empty' },
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

export type GameLocation = Location<
  LocationKeys,
  ActivityKeys,
  ActivityTagKeys
>;

export const locations: {
  [key in LocationKeys]: GameLocation;
} = definitions.reduce((acc, def) => {
  acc[def.id] = new Location({
    id: def.id,
    name: def.name,
    activities: (def.activities || []).map(a => activities[a]),
  });

  return acc;
}, {} as { [key in LocationKeys]: GameLocation });
