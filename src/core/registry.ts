import { Activity } from './activity';
import { Location } from './location';
import { Resource } from './resource';

export class GameRegistry<
  Activities extends string,
  Locations extends string,
  Resources extends string,
> {
  constructor(
    readonly activities: {
      [key in Activities]: Activity<Activities, Locations, Resources>;
    },
    readonly locations: {
      [key in Locations]: Location<Activities, Locations, Resources>;
    },
    readonly resources: {
      [key in Resources]: Resource<Activities, Locations, Resources>;
    },
  ) {}
}
