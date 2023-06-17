import { Activity, ActivityDef } from 'core/activity';
import { keyBy, mapValues } from 'lodash';
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

export const activities: { [key in ActivityKeys]: GameActivities } = mapValues(
  keyBy(definitions, 'id'),
  def => {
    return new Activity({
      id: def.id,
      name: def.name,
      tags: new Set(def.tags),
    });
  },
) as { [key in ActivityKeys]: GameActivities };
