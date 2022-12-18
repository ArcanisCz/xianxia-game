import { Game } from './game';

export class GameClient<Activities extends string, Locations extends string> {
  constructor(private readonly game: Game<Activities, Locations>) {}

  aaa(): void {
    // eslint-disable-next-line no-console
    console.log('aaa');
  }
}
