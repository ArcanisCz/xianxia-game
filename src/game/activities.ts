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
    resources: {
      qi: 1,
    },
  },
  {
    id: 'raid',
    name: 'Raid',
    tags: ['day'],
    resources: {
      gold: 1,
    },
  },
  {
    id: 'idle',
    name: 'Idle',
    tags: ['day', 'night'],
    resources: {
      qi: 0.5,
    },
  },
];
