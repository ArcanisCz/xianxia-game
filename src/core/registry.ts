import { Activity } from './activity';
import { ActivityTagDef } from './activityTag';
import { Location } from './location';

export class GameRegistry<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
  Resources extends string,
> {
  constructor(
    readonly activities: {
      [key in Activities]: Activity<Activities, ActivityTags>;
    },
    readonly locations: {
      [key in Locations]: Location<Locations, Activities>;
    },
    readonly activityTags: {
      [key in ActivityTags]: ActivityTagDef<ActivityTags>;
    },
    readonly resources: {
      [key in Resources]: ActivityTagDef<Resources>;
    },
    readonly parallelActivityTags: ActivityTags[],
  ) {}
}
