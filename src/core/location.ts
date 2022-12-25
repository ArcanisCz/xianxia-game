import { Activity } from './activity';

export type LocationDef<LocationKeys, ActivityKeys> = {
  id: LocationKeys;
  name: string;
  dayActivities?: ActivityKeys[];
  nightActivities?: ActivityKeys[];
};

export class Location<LocationKeys, ActivityKeys> {
  constructor(init: {
    id: LocationKeys;
    name: string;
    dayActivities: Activity<ActivityKeys>[];
    nightActivities: Activity<ActivityKeys>[];
  }) {
    this.name = init.name;
    this.id = init.id;
    this.dayActivities = init.dayActivities;
    this.nightActivities = init.nightActivities;
  }

  readonly name: string;
  readonly id: LocationKeys;
  readonly dayActivities: Activity<ActivityKeys>[];
  readonly nightActivities: Activity<ActivityKeys>[];
  // Danger Level
  // Spiritual particles density
}
