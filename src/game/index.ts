import {
  Activity,
  ActivityTagDef,
  Game,
  GameClient,
  Location,
  Resource,
} from 'core';
import type { ActivityKeys } from './activities';
import type { ActivityTagKeys } from './activityTags';
import type { LocationKeys } from './location';
import type { ResourceKeys } from './resources';

export {
  locationDefinitions,
  activityDefinitions,
  activityTagDefinitions,
  resourceDefinitions,
} from './registry';

export type {
  GameActivityTags,
  GameActivities,
  GameLocation,
  GameResources,
} from './registry';

export type XianxiaGame = Game<
  ActivityKeys,
  LocationKeys,
  ActivityTagKeys,
  ResourceKeys,
  ActivityTagDef<ActivityTagKeys>,
  Location<LocationKeys, ActivityKeys, ResourceKeys>,
  Activity<ActivityKeys, ActivityTagKeys, LocationKeys, ResourceKeys>,
  Resource<ResourceKeys>
>;

export type XianxiaGameClient = GameClient<
  ActivityKeys,
  LocationKeys,
  ActivityTagKeys,
  ResourceKeys,
  ActivityTagDef<ActivityTagKeys>,
  Location<LocationKeys, ActivityKeys, ResourceKeys>,
  Activity<ActivityKeys, ActivityTagKeys, LocationKeys, ResourceKeys>,
  Resource<ResourceKeys>
>;
