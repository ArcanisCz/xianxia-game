import { LocationDef } from 'core';
import { ActivityKeys } from './activities';
import { ResourceKeys } from './resources';

export type LocationKeys = 'empty' | 'graveyard' | 'sect';

// TODO: how to type error non existing location and also duplicate?
export const locationDefinitions: LocationDef<
  LocationKeys,
  ActivityKeys,
  ResourceKeys
>[] = [
  {
    id: 'graveyard',
    name: 'Graveyard',
    activities: ['raid'],
    locations: ['sect'],
    effects: [
      {
        resource: 'qi',
        resourceTarget: 'gain',
        value: {
          baseAmnt: 0.75,
        },
      },
    ],
  },
  {
    id: 'sect',
    name: 'Sect',
    activities: ['meditate'],
    locations: ['graveyard'],
    effects: [
      {
        resource: 'qi',
        resourceTarget: 'gain',
        value: {
          baseAmnt: 1,
        },
      },
    ],
  },
];
