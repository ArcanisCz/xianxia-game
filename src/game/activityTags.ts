import { ActivityTagDef } from 'core';

export type ActivityTagKeys = 'day' | 'night';
export const activityTagDefinitions: ActivityTagDef<ActivityTagKeys>[] = [
  {
    id: 'day',
    name: 'Day',
  },
  {
    id: 'night',
    name: 'Night',
  },
];
