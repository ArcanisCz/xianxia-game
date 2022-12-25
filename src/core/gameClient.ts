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
    // eslint-disable-next-line no-console
    console.log('aaa');
  }
}
