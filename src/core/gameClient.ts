import { mapValues } from 'lodash';
import { Activity } from './activity';
import { Game } from './game';
import { Location } from './location';
import { Resource } from './resource';

export class GameClient<
  Activities extends string,
  Locations extends string,
  Resources extends string,
  LocationType extends Location<Activities, Locations, Resources>,
  ActivityType extends Activity<Activities, Locations, Resources>,
  ResourceType extends Resource<Activities, Locations, Resources>,
> {
  constructor(
    private readonly game: Game<
      Activities,
      Locations,
      Resources,
      LocationType,
      ActivityType,
      ResourceType
    >,
  ) {}

  aaa(): void {
    const { gameState, gameRegistry } = this.game;

    gameState.changeResourcesTick();

    // eslint-disable-next-line no-console
    console.log({
      currentLocation: gameState.currentLocation,
      currentActivities: gameState.activeActivity,
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
