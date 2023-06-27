import { forEach, keyBy, map, mapKeys, mapValues } from 'lodash';
import { Activity, ActivityDef } from './activity';
import { Effect } from './effect';
import { Location, LocationDef } from './location';
import { GameRegistry } from './registry';
import { Resource, ResourceDef } from './resource';
import { Stage, StageDef } from './stage';
import { GameState } from './state';

export class Game<
  Activities extends string,
  Locations extends string,
  Resources extends string,
  Stages extends string,
  LocationType extends Location<Activities, Locations, Resources, Stages>,
  ActivityType extends Activity<Activities, Locations, Resources, Stages>,
  ResourceType extends Resource<Activities, Locations, Resources, Stages>,
  StageType extends Stage<Activities, Locations, Resources, Stages>,
> {
  private readonly _gameRegistry: GameRegistry<
    Activities,
    Locations,
    Resources,
    Stages
  >;
  readonly gameState: GameState<Activities, Locations, Resources, Stages>;

  /**
   * This is to force an interface to outside world - to express intention
   * of limiting access to mainly setters - all actions needs to be called on
   * Game/GameState classes.
   */
  get gameRegistry(): {
    readonly activities: {
      [key in Activities]: Pick<ActivityType, 'id' | 'name' | 'effects'>;
    };
    readonly locations: {
      [key in Locations]: Pick<
        LocationType,
        'id' | 'name' | 'locations' | 'activities' | 'effects'
      >;
    };
    readonly resources: {
      [key in Resources]: Pick<
        ResourceType,
        'id' | 'name' | 'amount' | 'max' | 'gainPerSec'
      >;
    };
    readonly stages: {
      [key in Stages]: Pick<StageType, 'id' | 'name' | 'nextStage' | 'effects'>;
    };
  } {
    return this._gameRegistry;
  }

  constructor(
    {
      locationDefinitions,
      activityDefinitions,
      resourceDefinitions,
      stageDefinitions,
    }: {
      locationDefinitions: LocationDef<Locations, Activities, Resources>[];
      activityDefinitions: ActivityDef<Activities, Resources>[];
      resourceDefinitions: ResourceDef<Resources>[];
      stageDefinitions: StageDef<Resources, Stages>[];
    },
    {
      emptyActivity,
      startingLocation,
      startingStage,
    }: {
      emptyActivity: Activities;
      startingLocation: Locations;
      startingStage: Stages;
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

    const stagesMap = mapValues(
      keyBy(stageDefinitions, 'id'),
      def =>
        new Stage({
          id: def.id,
          name: def.name,
          nextStage: def.nextStage,
          effects: map(
            def.effects || [],
            effectDef => new Effect(effectDef, { stage: def.id }),
          ),
        }),
    ) as { [key in Stages]: StageType };

    this._gameRegistry = new GameRegistry(
      activitiesMap,
      locationsMap,
      resourcesMap,
      stagesMap,
    );

    this.gameState = new GameState(
      emptyActivity,
      startingLocation,
      startingStage,
      this._gameRegistry,
    );

    forEach(this._gameRegistry.resources, resource =>
      resource.setGameState(this.gameState),
    );
  }
}
