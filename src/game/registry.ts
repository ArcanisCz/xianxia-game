import { Activity, Location, ActivityTagDef } from 'core';
import { ActivityKeys } from './activities';
import { ActivityTagKeys } from './activityTags';
import { LocationKeys } from './location';

export { activityDefinitions } from './activities';
export { activityTagDefinitions } from './activityTags';
export { locationDefinitions } from './location';

export type GameLocation = Location<
  LocationKeys,
  ActivityKeys,
  ActivityTagKeys
>;
export type GameActivities = Activity<ActivityKeys, ActivityTagKeys>;
export type GameActivityTags = ActivityTagDef<ActivityTagKeys>;
export type { ActivityKeys } from './activities';
export type { ActivityTagKeys } from './activityTags';
export type { LocationKeys } from './location';