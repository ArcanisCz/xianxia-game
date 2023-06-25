import { Activity, Location, Resource } from 'core';
import { ActivityKeys } from './activities';
import { LocationKeys } from './location';
import { ResourceKeys } from './resources';

export { activityDefinitions } from './activities';
export { locationDefinitions } from './location';
export { resourceDefinitions } from './resources';

export type GameLocation = Location<LocationKeys, ActivityKeys, ResourceKeys>;
export type GameActivities = Activity<ActivityKeys, LocationKeys, ResourceKeys>;
export type GameResources = Resource<ResourceKeys>;

export type { ActivityKeys } from './activities';
export type { LocationKeys } from './location';
export type { ResourceKeys } from './resources';
