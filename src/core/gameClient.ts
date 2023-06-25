import { mapValues } from 'lodash';
import { Activity } from './activity';
import { Game } from './game';
import { Location } from './location';
import { Resource } from './resource';
import { Stage } from './stage';

export class GameClient<
  Activities extends string,
  Locations extends string,
  Resources extends string,
  Stages extends string,
  LocationType extends Location<Activities, Locations, Resources, Stages>,
  ActivityType extends Activity<Activities, Locations, Resources, Stages>,
  ResourceType extends Resource<Activities, Locations, Resources, Stages>,
  StagesType extends Stage<Activities, Locations, Resources, Stages>,
> {
  constructor(
    private readonly game: Game<
      Activities,
      Locations,
      Resources,
      Stages,
      LocationType,
      ActivityType,
      ResourceType,
      StagesType
    >,
  ) {}

  aaa(): void {
    const { gameState, gameRegistry } = this.game;

    gameState.changeResourcesTick();

    // eslint-disable-next-line no-console
    console.log({
      currentLocation: gameState.currentLocation,
      currentActivities: gameState.activeActivity,
      currentStage: gameState.currentStage,
      availableAbilities: gameState.availableActivities,
      availableLocations: gameState.availableLocations,
      resources: mapValues(
        gameRegistry.resources,
        resource => `${resource.amount}/${resource.max}`,
      ),
      effects: gameState.activeEffects,
    });
  }
}
