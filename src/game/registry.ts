import { Activity, Location, ActivityTagDef, Resource } from 'core';
import { ActivityKeys } from './activities';
import { ActivityTagKeys } from './activityTags';
import { LocationKeys } from './location';
import { ResourceKeys } from './resources';

export { activityDefinitions } from './activities';
export { activityTagDefinitions } from './activityTags';
export { locationDefinitions } from './location';
export { resourceDefinitions } from './resources';

export type GameLocation = Location<LocationKeys, ActivityKeys>;
export type GameActivities = Activity<
  ActivityKeys,
  ActivityTagKeys,
  ResourceKeys
>;
export type GameActivityTags = ActivityTagDef<ActivityTagKeys>;
export type GameResources = Resource<ResourceKeys>;

export type { ActivityKeys } from './activities';
export type { ActivityTagKeys } from './activityTags';
export type { LocationKeys } from './location';
export type { ResourceKeys } from './resources';
