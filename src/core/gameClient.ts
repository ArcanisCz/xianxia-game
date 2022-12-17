import { Game } from './game';

export class GameClient<Activities extends string> {
  constructor(private readonly game: Game<Activities>) {}

  aaa(): void {
    console.log('aaa');
  }
}
