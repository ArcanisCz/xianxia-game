import { Activity, ActivityTime } from './activity';

export type LocationDef<LocationKeys, ActivityKeys> = {
  id: LocationKeys;
  name: string;
  activities: {
    [ActivityTime.Day]?: ActivityKeys[];
    [ActivityTime.Night]?: ActivityKeys[];
  };
};

export class Location<LocationKeys, ActivityKeys> {
  constructor(init: {
    id: LocationKeys;
    name: string;
    activities: {
      [ActivityTime.Day]: Activity<ActivityKeys>[];
      [ActivityTime.Night]: Activity<ActivityKeys>[];
    };
  }) {
    this.name = init.name;
    this.id = init.id;
    this.activities = init.activities;
  }

  readonly name: string;
  readonly id: LocationKeys;
  readonly activities: {
    [ActivityTime.Day]: Activity<ActivityKeys>[];
    [ActivityTime.Night]: Activity<ActivityKeys>[];
  };
  // Danger Level
  // Spiritual particles density
}
