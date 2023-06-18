import { Activity, ActivityTagDef, Game, GameClient, Location } from 'core';
import type { ActivityKeys } from './activities';
import type { ActivityTagKeys } from './activityTags';
import type { LocationKeys } from './location';

export {
  locationDefinitions,
  activityDefinitions,
  activityTagDefinitions,
} from './registry';

export type {
  GameActivityTags,
  GameActivities,
  GameLocation,
} from './registry';

export type XianxiaGame = Game<
  ActivityKeys,
  LocationKeys,
  ActivityTagKeys,
  ActivityTagDef<ActivityTagKeys>,
  Location<LocationKeys, ActivityKeys, ActivityTagKeys>,
  Activity<ActivityKeys, ActivityTagKeys>
>;

export type XianxiaGameClient = GameClient<
  ActivityKeys,
  LocationKeys,
  ActivityTagKeys,
  ActivityTagDef<ActivityTagKeys>,
  Location<LocationKeys, ActivityKeys, ActivityTagKeys>,
  Activity<ActivityKeys, ActivityTagKeys>
>;
