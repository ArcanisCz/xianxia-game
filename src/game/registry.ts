import { Activity, Location, Resource, Stage, Upgrade } from 'core';
import { ActivityKeys } from './activities';
import { LocationKeys } from './location';
import { ResourceKeys } from './resources';
import { StageKeys } from './stages';
import { UpgradeKeys } from './upgrades';

export { activityDefinitions } from './activities';
export { locationDefinitions } from './location';
export { resourceDefinitions } from './resources';
export { stageDefinitions } from './stages';
export { upgradeDefinitions } from './upgrades';

export type GameLocation = Location<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys,
  UpgradeKeys
>;
export type GameActivities = Activity<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys,
  UpgradeKeys
>;
export type GameResources = Resource<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys,
  UpgradeKeys
>;
export type GameStages = Stage<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys,
  UpgradeKeys
>;
export type GameUpgrades = Upgrade<
  ActivityKeys,
  LocationKeys,
  ResourceKeys,
  StageKeys,
  UpgradeKeys
>;

export type { ActivityKeys } from './activities';
export type { LocationKeys } from './location';
export type { ResourceKeys } from './resources';
export type { StageKeys } from './stages';
export type { UpgradeKeys } from './upgrades';
