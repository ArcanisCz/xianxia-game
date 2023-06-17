import { GameRegistry } from './registry';
import { GameState } from './state';

export class Game<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
> {
  constructor(
    readonly gameRegistry: GameRegistry<Activities, Locations, ActivityTags>,
    readonly gameState: GameState<Activities, Locations, ActivityTags>,
  ) {}
}
