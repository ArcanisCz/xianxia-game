import { Activity } from './activity';

export type LocationInit<LocationKeys> = {
  id: LocationKeys;
  name: string;
  activities: Readonly<Activity[]>;
};

export class Location<LocationKeys> {
  constructor(init: LocationInit<LocationKeys>) {
    this.name = init.name;
    this.id = init.id;
    this.activities = [...init.activities];
  }

  readonly name: string;
  readonly id: LocationKeys;
  readonly activities: Activity[];
}
