import { ActivityDef } from 'core';
import { ActivityTagKeys } from './activityTags';

export type ActivityKeys = 'empty' | 'meditate' | 'raid' | 'idle';
export const activityDefinitions: ActivityDef<ActivityKeys, ActivityTagKeys>[] =
  [
    {
      id: 'empty',
      name: 'Empty',
      tags: ['day', 'night'],
    },
    {
      id: 'meditate',
      name: 'Meditate',
      tags: ['night'],
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
