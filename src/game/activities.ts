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

export const activities: { [key in ActivityKeys]: Activity } =
  definitions.reduce((acc, def) => {
    acc[def.id] = new Activity(def);

    return acc;
  }, {} as { [key in ActivityKeys]: Activity });
