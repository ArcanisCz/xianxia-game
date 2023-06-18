import { Activity, Location, initGame } from 'core';
import { ActivityTagKeys } from './activityTags';
import { locationDefinitions, LocationKeys } from './location';
import { activityDefinitions, ActivityKeys } from './activities';

export type GameLocation = Location<
  LocationKeys,
  ActivityKeys,
  ActivityTagKeys
>;
export type GameActivities = Activity<ActivityKeys, ActivityTagKeys>;

export const { locations, activities } = initGame(
  locationDefinitions,
  activityDefinitions,
);
