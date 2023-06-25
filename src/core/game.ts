import { keyBy, map, mapKeys, mapValues } from 'lodash';
import { Activity, ActivityDef } from './activity';
import { Effect } from './effect';
import { Location, LocationDef } from './location';
import { GameRegistry } from './registry';
import { Resource, ResourceDef } from './resource';
import { GameState } from './state';

export class Game<
  Activities extends string,
  Locations extends string,
  Resources extends string,
  LocationType extends Location<Locations, Activities, Resources>,
  ActivityType extends Activity<Activities, Locations, Resources>,
  ResourceType extends Resource<Resources>,
> {
  private readonly _gameRegistry: GameRegistry<
    Activities,
    Locations,
    Resources
  >;
  readonly gameState: GameState<Activities, Locations, Resources>;

  /**
   * This is to force an interface to outside world - to express intention
   * of limiting access to mainly setters - all actions needs to be called on
   * Game/GameState classes.
   */
  get gameRegistry(): {
    readonly activities: {
      [key in Activities]: Pick<
        ActivityType,
        'id' | 'name' | 'active' | 'effects'
      >;
    };
    readonly locations: {
      [key in Locations]: Pick<
        LocationType,
        'id' | 'name' | 'locations' | 'activities' | 'effects'
      >;
    };
    readonly resources: {
      [key in Resources]: Pick<ResourceType, 'id' | 'name' | 'amount'>;
    };
  } {
    return this._gameRegistry;
  }

  constructor(
    {
      locationDefinitions,
      activityDefinitions,
      resourceDefinitions,
    }: {
      locationDefinitions: LocationDef<Locations, Activities, Resources>[];
      activityDefinitions: ActivityDef<Activities, Resources>[];
      resourceDefinitions: ResourceDef<Resources>[];
    },
    {
      emptyActivity,
      startingLocation,
    }: {
      emptyActivity: Activities;
      startingLocation: Locations;
    },
  ) {
    const activitiesMap = mapValues(
      keyBy(activityDefinitions, 'id'),
      def =>
        new Activity({
          id: def.id,
          name: def.name,
          effects: map(
            def.effects || [],
            effectDef => new Effect(effectDef, { activity: def.id }),
          ),
        }),
    ) as { [key in Activities]: ActivityType };

    const locationsArray = locationDefinitions.map(
      def =>
        new Location({
          id: def.id,
          name: def.name,
          activities: def.activities || [],
          locations: def.locations || [],
          effects: map(
            def.effects || [],
            effectDef => new Effect(effectDef, { location: def.id }),
          ),
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
      resourcesMap,
    );

    this.gameState = new GameState(
      emptyActivity,
      startingLocation,
      this._gameRegistry,
    );
  }
}
