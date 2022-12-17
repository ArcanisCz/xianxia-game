import { Location } from 'core/location';
import { activities } from './activities';

const definitions = [
  {
    id: 'graveyard',
    name: 'Graveyard',
    activities: [activities.get('raid')],
  },
  {
    id: 'sect',
    name: 'Sect',
    activities: [activities.get('meditate')],
  },
] as const;

export type LocationKeys = typeof definitions[number]['id'];

export const locations: Map<LocationKeys, Location<LocationKeys>> = new Map(
  definitions.map(def => [def.id, new Location(def)]),
);
