import { mapValues, keyBy } from 'lodash';
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
  LocationType extends Location<Locations, Activities>,
  ActivityType extends Activity<Activities, ActivityTags, Resources>,
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

    gameState.changeResourcesTick();

    // eslint-disable-next-line no-console
    console.log({
      currentLocation: gameState.currentLocation,
      currentActivities: gameState.activeActivity,
      availableAbilities: mapValues(
        keyBy(gameRegistry.parallelActivityTags),
        tag => gameState.availableActivitiesByTag(tag),
      ),
      availableLocations: gameState.availableLocations,
      resources: mapValues(gameRegistry.resources, value => value.amount),
    });
  }
}
