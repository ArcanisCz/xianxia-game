import { Activity, Location, initGame, ActivityTagDef } from 'core';
import { activityDefinitions, ActivityKeys } from './activities';
import { activityTagDefinitions, ActivityTagKeys } from './activityTags';
import { locationDefinitions, LocationKeys } from './location';

export type GameLocation = Location<
  LocationKeys,
  ActivityKeys,
  ActivityTagKeys
>;
export type GameActivities = Activity<ActivityKeys, ActivityTagKeys>;
export type GameActivityTags = ActivityTagDef<ActivityTagKeys>;

export const { locations, activities, activityTags } = initGame(
  activityTagDefinitions,
  locationDefinitions,
  activityDefinitions,
);
