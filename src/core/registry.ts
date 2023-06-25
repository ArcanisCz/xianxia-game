import { Activity } from './activity';
import { Location } from './location';
import { Resource } from './resource';
import { Stage } from './stage';

export class GameRegistry<
  Activities extends string,
  Locations extends string,
  Resources extends string,
  Stages extends string,
> {
  constructor(
    readonly activities: {
      [key in Activities]: Activity<Activities, Locations, Resources, Stages>;
    },
    readonly locations: {
      [key in Locations]: Location<Activities, Locations, Resources, Stages>;
    },
    readonly resources: {
      [key in Resources]: Resource<Activities, Locations, Resources, Stages>;
    },
    readonly stages: {
      [key in Stages]: Stage<Activities, Locations, Resources, Stages>;
    },
  ) {}
}
