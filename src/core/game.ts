import { keyBy, mapKeys, mapValues } from 'lodash';
import { Activity, ActivityDef } from './activity';
import { ActivityTagDef } from './activityTag';
import { Location, LocationDef } from './location';
import { GameRegistry } from './registry';
import { GameState } from './state';

export class Game<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
  ActivityTagType extends ActivityTagDef<ActivityTags>,
  LocationType extends Location<Locations, Activities, ActivityTags>,
  ActivityType extends Activity<Activities, ActivityTags>,
> {
  readonly gameRegistry: GameRegistry<Activities, Locations, ActivityTags>;
  readonly gameState: GameState<Activities, Locations, ActivityTags>;

  constructor(
    activityTagDefinitions: ActivityTagDef<ActivityTags>[],
    locationDefinitions: LocationDef<Locations, Activities>[],
    activityDefinitions: ActivityDef<Activities, ActivityTags>[],
    parallelActivityTags: ActivityTags[],
    emptyActivity: Activities,
    startingLocation: Locations,
  ) {
    const activityTagsMap = mapValues(
      keyBy(activityTagDefinitions, 'id'),
      def => def,
    ) as { [key in ActivityTags]: ActivityTagType };

    const activitiesMap = mapValues(
      keyBy(activityDefinitions, 'id'),
      def =>
        new Activity({
          id: def.id,
          name: def.name,
          tags: new Set(def.tags),
        }),
    ) as { [key in Activities]: ActivityType };

    const locationsArray = locationDefinitions.map(
      def =>
        new Location({
          id: def.id,
          name: def.name,
          activities: (def.activities || []).map(a => activitiesMap[a]),
          locations: [],
        }),
    );

    const locationsMap = mapKeys(locationsArray, 'id') as {
      [key in Locations]: LocationType;
    };

    locationDefinitions.forEach(def => {
      const loc = locationsMap[def.id];

      // @ts-ignore
      loc['locations'] = (def.locations || []).map(a => locationsMap[a]);
    });

    this.gameRegistry = new GameRegistry(
      activitiesMap,
      locationsMap,
      activityTagsMap,
      parallelActivityTags,
    );

    this.gameState = new GameState(
      this.gameRegistry.activities[emptyActivity],
      this.gameRegistry.locations[startingLocation],
      this.gameRegistry,
    );
  }
}
