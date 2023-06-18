import { LocationDef } from 'core/location';
import { ActivityKeys } from './activities';

export type LocationKeys = 'empty' | 'graveyard' | 'sect';

// TODO: how to type error non existing location and also duplicate?
export const definitions: LocationDef<LocationKeys, ActivityKeys>[] = [
  {
    id: 'graveyard',
    name: 'Graveyard',
    activities: ['raid'],
    locations: ['sect'],
  },
  {
    id: 'sect',
    name: 'Sect',
    activities: ['meditate'],
    locations: ['graveyard'],
  },
];


