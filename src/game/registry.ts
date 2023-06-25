import { Activity, Location, Resource, Stage } from 'core';
import { ActivityKeys } from './activities';
import { LocationKeys } from './location';
import { ResourceKeys } from './resources';
import { StageKeys } from './stages';

export { activityDefinitions } from './activities';
export { locationDefinitions } from './location';
export { resourceDefinitions } from './resources';
export { stageDefinitions } from './stages';

export type GameLocation = Location<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys
>;
export type GameActivities = Activity<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys
>;
export type GameResources = Resource<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys
>;
export type GameStages = Stage<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys
>;

export type { ActivityKeys } from './activities';
export type { LocationKeys } from './location';
export type { ResourceKeys } from './resources';
