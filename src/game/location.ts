import { Location, LocationDef } from 'core/location';
import { activities, ActivityKeys } from './activities';

export type LocationKeys = 'empty' | 'graveyard' | 'sect';

const definitions: LocationDef<LocationKeys, ActivityKeys>[] = [
  {
    id: 'graveyard',
    name: 'Graveyard',
    dayActivities: ['raid'],
  },
  {
    id: 'sect',
    name: 'Sect',
    nightActivities: ['meditate'],
  },
];

export type GameLocation = Location<LocationKeys, ActivityKeys>;

export const locations: {
  [key in LocationKeys]: GameLocation;
} = definitions.reduce((acc, def) => {
  acc[def.id] = new Location({
    id: def.id,
    name: def.name,
    dayActivities: (def.dayActivities || []).map(a => activities[a]),
    nightActivities: (def.nightActivities || []).map(a => activities[a]),
  });

  return acc;
}, {} as { [key in LocationKeys]: GameLocation });
