import { Activity, Game, GameClient, Location, Resource, Stage, Upgrade } from "core";
import { Effect } from '../core/effect';
import type { ActivityKeys } from './activities';
import type { LocationKeys } from './location';
import type { ResourceKeys } from './resources';
import type { StageKeys } from './stages';
import type { UpgradeKeys } from './upgrades';

export {
  locationDefinitions,
  activityDefinitions,
  resourceDefinitions,
  stageDefinitions,
  upgradeDefinitions,
} from './registry';

export type { GameActivities, GameLocation, GameResources } from './registry';

export type XianxiaGame = Game<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys,
  UpgradeKeys,
  Location<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>,
  Activity<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>,
  Resource<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>,
  Stage<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>,
  Upgrade<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>
>;

export type XianxiaGameClient = GameClient<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys,
  UpgradeKeys,
  Location<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>,
  Activity<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>,
  Resource<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>,
  Stage<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>,
  Upgrade<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>
>;

export type GameEffect = Effect<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys,
  UpgradeKeys
>;

export type { ActivityKeys } from './activities';
export type { LocationKeys } from './location';
export type { ResourceKeys } from './resources';
