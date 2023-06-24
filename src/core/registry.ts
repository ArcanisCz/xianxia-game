import { Activity } from './activity';
import { ActivityTagDef } from './activityTag';
import { Location } from './location';
import { Resource } from './resource';

export class GameRegistry<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
  Resources extends string,
> {
  constructor(
    readonly activities: {
      [key in Activities]: Activity<
        Activities,
        ActivityTags,
        Locations,
        Resources
      >;
    },
    readonly locations: {
      [key in Locations]: Location<Locations, Activities, Resources>;
    },
    readonly activityTags: {
      [key in ActivityTags]: ActivityTagDef<ActivityTags>;
    },
    readonly resources: {
      [key in Resources]: Resource<Resources>;
    },
    readonly parallelActivityTags: ActivityTags[],
  ) {}
}
