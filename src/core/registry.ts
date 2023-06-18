import { Activity } from './activity';
import { ActivityTagDef } from './activityTag';
import { Location } from './location';

export class GameRegistry<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
> {
  constructor(
    readonly activities: {
      [key in Activities]: Activity<Activities, ActivityTags>;
    },
    readonly locations: {
      [key in Locations]: Location<Locations, Activities, ActivityTags>;
    },
    readonly activityTags: {
      [key in ActivityTags]: ActivityTagDef<ActivityTags>;
    },
    readonly parallelActivityTags: ActivityTags[],
  ) {}
}
