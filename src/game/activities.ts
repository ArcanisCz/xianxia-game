import {
  Activity,
  ActivityDef,
  CoreActivityKeys,
  CoreActivities,
} from 'core/activity';

export type ActivityKeys = CoreActivityKeys | 'meditate' | 'raid' | 'idle';
const definitions: ActivityDef<ActivityKeys>[] = [
  ...CoreActivities,
  {
    id: 'meditate',
    name: 'Meditate',
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

export const activities: { [key in ActivityKeys]: Activity<ActivityKeys> } =
  definitions.reduce((acc, def) => {
    acc[def.id] = new Activity(def);

    return acc;
  }, {} as { [key in ActivityKeys]: Activity<ActivityKeys> });
