import { Activity } from 'core/activity';

const definitions = [
  {
    name: 'Meditate',
    id: 'meditate',
  },
  {
    name: 'Raid',
    id: 'raid',
  },
] as const;

export type ActivityKeys = typeof definitions[number]['id'];

export const activities: Map<ActivityKeys, Activity> = new Map(
  definitions.map(def => [def.id, new Activity(def)]),
);
