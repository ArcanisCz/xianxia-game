export type ActivityDef<
  ActivityKeys extends string,
  ActivityTags extends string,
> = {
  id: ActivityKeys;
  name: string;
  tags: ActivityTags[];
};

export class Activity<
  ActivityKeys extends string,
  ActivityTags extends string,
> {
  constructor(init: {
    id: ActivityKeys;
    name: string;
    tags: Set<ActivityTags>;
  }) {
    this.name = init.name;
    this.id = init.id;
    this.tags = init.tags;
  }

  name: string;
  id: ActivityKeys;
  tags: Set<ActivityTags>;
}
