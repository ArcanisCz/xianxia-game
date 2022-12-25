export type ActivityDef<ActivityKeys> = {
  id: ActivityKeys;
  name: string;
};

export class Activity<ActivityKeys> {
  constructor(init: { id: ActivityKeys; name: string }) {
    this.name = init.name;
    this.id = init.id;
  }

  name: string;
  id: ActivityKeys;
}

export enum ActivityTime {
  Day = 'day',
  Night = 'night',
}
