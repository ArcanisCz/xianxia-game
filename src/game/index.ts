import { Activity, Game, GameClient, Location, Resource, Stage } from 'core';
import type { ActivityKeys } from './activities';
import type { LocationKeys } from './location';
import type { ResourceKeys } from './resources';
import type { StageKeys } from './stages';

export {
  locationDefinitions,
  activityDefinitions,
  resourceDefinitions,
  stageDefinitions,
} from './registry';

export type { GameActivities, GameLocation, GameResources } from './registry';

export type XianxiaGame = Game<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys,
  Location<ActivityKeys, LocationKeys, ResourceKeys, StageKeys>,
  Activity<ActivityKeys, LocationKeys, ResourceKeys, StageKeys>,
  Resource<ActivityKeys, LocationKeys, ResourceKeys, StageKeys>,
  Stage<ActivityKeys, LocationKeys, ResourceKeys, StageKeys>
>;

export type XianxiaGameClient = GameClient<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys,
  Location<ActivityKeys, LocationKeys, ResourceKeys, StageKeys>,
  Activity<ActivityKeys, LocationKeys, ResourceKeys, StageKeys>,
  Resource<ActivityKeys, LocationKeys, ResourceKeys, StageKeys>,
  Stage<ActivityKeys, LocationKeys, ResourceKeys, StageKeys>
>;

export type { ActivityKeys } from './activities';
export type { LocationKeys } from './location';
export type { ResourceKeys } from './resources';
