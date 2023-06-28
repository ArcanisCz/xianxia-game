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
        resourceTarget: 'gain',
        value: { baseAmnt: 0.25 },
      },
      {
        resource: 'qi',
        resourceTarget: 'gain',
        value: { multMult: 1.1 },
      },
    ],
  },
  {
    id: 'raid',
    name: 'Raid',
    effects: [
      {
        resource: 'gold',
        resourceTarget: 'gain',
        value: { baseAmnt: 1 },
      },
    ],
  },
  {
    id: 'idle',
    name: 'Idle',
  },
];
