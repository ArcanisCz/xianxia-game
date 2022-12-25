import { ActivityTagDef } from 'core/activityTag';

export type ActivityTagKeys = 'day' | 'night';
const definitions: ActivityTagDef<ActivityTagKeys>[] = [
  {
    id: 'day',
    name: 'Day',
  },
  {
    id: 'night',
    name: 'Night',
  },
];

export type GameActivityTags = ActivityTagDef<ActivityTagKeys>;

export const activityTags: { [key in ActivityTagKeys]: GameActivityTags } =
  definitions.reduce((acc, def) => {
    acc[def.id] = def;

    return acc;
  }, {} as { [key in ActivityTagKeys]: GameActivityTags });
