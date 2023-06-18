import { Location } from 'core/location';
import { initLocations } from 'core/utils';
import { activities, ActivityKeys } from './activities';
import { ActivityTagKeys } from './activityTags';
import { definitions, LocationKeys } from './location';

export type GameLocation = Location<
  LocationKeys,
  ActivityKeys,
  ActivityTagKeys
>;

export const locations = initLocations(definitions, activities);
