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
    resources: {
      rest: 1,
    },
  },
  {
    id: 'meditate',
    name: 'Meditate',
    tags: ['night'],
    resources: {
      qi: 1,
      rest: -1,
    },
  },
  {
    id: 'raid',
    name: 'Raid',
    tags: ['day'],
    resources: {
      qi: -1,
      rest: -1,
    },
  },
  {
    id: 'idle',
    name: 'Idle',
    tags: ['day', 'night'],
    resources: {
      rest: 1,
    },
  },
];
