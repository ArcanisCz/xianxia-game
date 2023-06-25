import { ActivityDef } from 'core';
import { ResourceKeys } from './resources';

export type ActivityKeys = 'empty' | 'meditate' | 'raid' | 'idle';
export const activityDefinitions: ActivityDef<ActivityKeys, ResourceKeys>[] = [
  {
    id: 'empty',
    name: 'Empty',
  },
  {
    id: 'meditate',
    name: 'Meditate',
    effects: [
      {
        resource: 'qi',
        value: { multMult: 1.1 },
      },
      {
        resource: 'gold',
        value: { baseAmnt: 1 },
      },
    ],
  },
  {
    id: 'raid',
    name: 'Raid',
  },
  {
    id: 'idle',
    name: 'Idle',
  },
];
