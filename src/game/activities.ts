import { Activity, ActivityDef } from 'core/activity';

export type ActivityKeys = 'empty' | 'meditate' | 'raid' | 'idle';
const definitions: ActivityDef<ActivityKeys>[] = [
  {
    id: 'empty',
    name: 'Empty',
  },
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

export type GameActivities = Activity<ActivityKeys>;

export const activities: { [key in ActivityKeys]: GameActivities } =
  definitions.reduce((acc, def) => {
    acc[def.id] = new Activity(def);

    return acc;
  }, {} as { [key in ActivityKeys]: GameActivities });
