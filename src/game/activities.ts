import { ActivityDef } from 'core';
import { ActivityTagKeys } from './activityTags';
import { ResourceKeys } from './resources';

export type ActivityKeys = 'empty' | 'meditate' | 'raid' | 'idle';
export const activityDefinitions: ActivityDef<
  ActivityKeys,
  ActivityTagKeys,
  ResourceKeys
>[] = [
  {
    id: 'empty',
    name: 'Empty',
    tags: ['day', 'night'],
  },
  {
    id: 'meditate',
    name: 'Meditate',
    tags: ['night'],
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
    tags: ['day'],
  },
  {
    id: 'idle',
    name: 'Idle',
    tags: ['day', 'night'],
  },
];
