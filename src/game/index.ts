import { Activity, Game, GameClient, Location, Resource } from 'core';
import type { ActivityKeys } from './activities';
import type { LocationKeys } from './location';
import type { ResourceKeys } from './resources';

export {
  locationDefinitions,
  activityDefinitions,
  resourceDefinitions,
} from './registry';

export type { GameActivities, GameLocation, GameResources } from './registry';

export type XianxiaGame = Game<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  Location<ActivityKeys, LocationKeys, ResourceKeys>,
  Activity<ActivityKeys, LocationKeys, ResourceKeys>,
  Resource<ActivityKeys, LocationKeys, ResourceKeys>
>;

export type XianxiaGameClient = GameClient<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  Location<ActivityKeys, LocationKeys, ResourceKeys>,
  Activity<ActivityKeys, LocationKeys, ResourceKeys>,
  Resource<ActivityKeys, LocationKeys, ResourceKeys>
>;
