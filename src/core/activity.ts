export type ActivityDef<ActivityKeys> = {
  id: ActivityKeys;
  name: string;
};

export type CoreActivityKeys = 'empty';
export const CoreActivities: ActivityDef<CoreActivityKeys>[] = [
  {
    id: 'empty',
    name: 'Empty',
  },
];

export class Activity<ActivityKeys> {
  constructor(init: { id: ActivityKeys; name: string }) {
    this.name = init.name;
    this.id = init.id;
  }

  name: string;
  id: ActivityKeys;
}
