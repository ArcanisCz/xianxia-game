import { mapValues, keyBy, map } from 'lodash';
import { Game } from './game';

export class GameClient<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
> {
  constructor(
    private readonly game: Game<Activities, Locations, ActivityTags>,
  ) {}

  aaa(): void {
    const { gameState, gameRegistry } = this.game;

    // eslint-disable-next-line no-console
    console.log({
      currentLocation: gameState.currentLocation.id,
      currentActivities: mapValues(gameState.activeActivity, 'id'),
      availableAbilities: mapValues(
        keyBy(gameRegistry.parallelActivityTags),
        tag => map(gameState.availableActivitiesByTag(tag), 'id'),
      ),
      availableLocations: map(gameState.availableLocations, 'id'),
    });
  }
}
