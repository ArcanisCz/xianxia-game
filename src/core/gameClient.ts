import { mapValues, keyBy, map } from 'lodash';
import { Activity } from './activity';
import { ActivityTagDef } from './activityTag';
import { Game } from './game';
import { Location } from './location';

export class GameClient<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
  ActivityTagType extends ActivityTagDef<ActivityTags>,
  LocationType extends Location<Locations, Activities, ActivityTags>,
  ActivityType extends Activity<Activities, ActivityTags>,
> {
  constructor(
    private readonly game: Game<
      Activities,
      Locations,
      ActivityTags,
      ActivityTagType,
      LocationType,
      ActivityType
    >,
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
