import { Activity, Location, initGame, ActivityTagDef } from 'core';
import { activityTagDefinitions, ActivityTagKeys } from './activityTags';
import { locationDefinitions, LocationKeys } from './location';
import { activityDefinitions, ActivityKeys } from './activities';

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
