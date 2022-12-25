import { Activity, ActivityDef } from 'core/activity';
import { ActivityTagKeys } from './activityTags';

export type ActivityKeys = 'empty' | 'meditate' | 'raid' | 'idle';
const definitions: ActivityDef<ActivityKeys, ActivityTagKeys>[] = [
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

export type GameActivities = Activity<ActivityKeys, ActivityTagKeys>;

export const activities: { [key in ActivityKeys]: GameActivities } =
  definitions.reduce((acc, def) => {
    acc[def.id] = new Activity({
      id: def.id,
      name: def.name,
      tags: new Set(def.tags),
    });

    return acc;
  }, {} as { [key in ActivityKeys]: GameActivities });
