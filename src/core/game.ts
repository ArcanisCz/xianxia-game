import { keyBy, mapKeys, mapValues } from 'lodash';
import { Activity, ActivityDef } from './activity';
import { ActivityTagDef } from './activityTag';
import { Location, LocationDef } from './location';
import { GameRegistry } from './registry';
import { Resource, ResourceDef } from './resource';
import { GameState } from './state';

export class Game<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
  Resources extends string,
  ActivityTagType extends ActivityTagDef<ActivityTags>,
  LocationType extends Location<Locations, Activities>,
  ActivityType extends Activity<Activities, ActivityTags>,
  ResourceType extends Resource<Resources>,
> {
  private readonly _gameRegistry: GameRegistry<
    Activities,
    Locations,
    ActivityTags,
    Resources
  >;
  readonly gameState: GameState<Activities, Locations, ActivityTags, Resources>;

  /**
   * This is to force an interface to outside world - to express intention
   * of limiting access to mainly setters - all actions needs to be called on
   * Game/GameState classes.
   */
  get gameRegistry(): {
    readonly activities: {
      [key in Activities]: Pick<
        Activity<Activities, ActivityTags>,
        'id' | 'name' | 'tags' | 'active'
      >;
    };
    readonly locations: {
      [key in Locations]: Pick<
        Location<Locations, Activities>,
        'id' | 'name' | 'locations' | 'activities'
      >;
    };
    readonly activityTags: {
      [key in ActivityTags]: Pick<ActivityTagDef<ActivityTags>, 'id' | 'name'>;
    };
    readonly resources: {
      [key in Resources]: Pick<ActivityTagDef<Resources>, 'id' | 'name'>;
    };
    readonly parallelActivityTags: ActivityTags[];
  } {
    return this._gameRegistry;
  }

  constructor(
    {
      activityTagDefinitions,
      locationDefinitions,
      activityDefinitions,
      resourceDefinitions,
    }: {
      activityTagDefinitions: ActivityTagDef<ActivityTags>[];
      locationDefinitions: LocationDef<Locations, Activities>[];
      activityDefinitions: ActivityDef<Activities, ActivityTags>[];
      resourceDefinitions: ResourceDef<Resources>[];
    },
    {
      parallelActivityTags,
      emptyActivity,
      startingLocation,
    }: {
      parallelActivityTags: ActivityTags[];
      emptyActivity: Activities;
      startingLocation: Locations;
    },
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
          activities: def.activities || [],
          locations: def.locations || [],
        }),
    );

    const locationsMap = mapKeys(locationsArray, 'id') as {
      [key in Locations]: LocationType;
    };

    const resourcesMap = mapValues(
      keyBy(resourceDefinitions, 'id'),
      def =>
        new Resource({
          id: def.id,
          name: def.name,
        }),
    ) as { [key in Resources]: ResourceType };

    this._gameRegistry = new GameRegistry(
      activitiesMap,
      locationsMap,
      activityTagsMap,
      resourcesMap,
      parallelActivityTags,
    );

    this.gameState = new GameState(
      emptyActivity,
      startingLocation,
      this._gameRegistry,
    );
  }
}
