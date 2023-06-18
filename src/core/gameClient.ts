import { mapValues, keyBy, map } from 'lodash';
import { Activity } from './activity';
import { ActivityTagDef } from './activityTag';
import { Game } from './game';
import { Location } from './location';
import { Resource } from './resource';

export class GameClient<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
  Resources extends string,
  ActivityTagType extends ActivityTagDef<ActivityTags>,
  LocationType extends Location<Locations, Activities, ActivityTags>,
  ActivityType extends Activity<Activities, ActivityTags>,
  ResourceType extends Resource<Resources>,
> {
  constructor(
    private readonly game: Game<
      Activities,
      Locations,
      ActivityTags,
      Resources,
      ActivityTagType,
      LocationType,
      ActivityType,
      ResourceType
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
