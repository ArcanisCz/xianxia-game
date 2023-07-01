import { mapValues } from 'lodash';
import { Activity } from './activity';
import { Game } from './game';
import { Location } from './location';
import { Resource } from './resource';
import { Stage } from './stage';
import { Upgrade } from './upgrade';

export class GameClient<
  Activities extends string,
  Locations extends string,
  Resources extends string,
  Stages extends string,
  Upgrades extends string,
  LocationType extends Location<
    Activities,
    Locations,
    Resources,
    Stages,
    Upgrades
  >,
  ActivityType extends Activity<
    Activities,
    Locations,
    Resources,
    Stages,
    Upgrades
  >,
  ResourceType extends Resource<
    Activities,
    Locations,
    Resources,
    Stages,
    Upgrades
  >,
  StagesType extends Stage<Activities, Locations, Resources, Stages, Upgrades>,
  UpgradeType extends Upgrade<
    Activities,
    Locations,
    Resources,
    Stages,
    Upgrades
  >,
> {
  constructor(
    private readonly game: Game<
      Activities,
      Locations,
      Resources,
      Stages,
      Upgrades,
      LocationType,
      ActivityType,
      ResourceType,
      StagesType,
      UpgradeType
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
