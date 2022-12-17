import { Activity } from 'core/activity';

const definitions = [
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
] as const;

export type ActivityKeys = typeof definitions[number]['id'];

export const activities: Map<ActivityKeys, Activity> = new Map(
  definitions.map(def => [def.id, new Activity(def)]),
);
