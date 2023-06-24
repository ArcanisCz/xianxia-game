import tap from 'tap';
import { ActivityDef } from './activity';
import { ActivityTagDef } from './activityTag';
import { Game } from './game';
import { LocationDef } from './location';
import { ResourceDef } from './resource';

const tagDefinition: ActivityTagDef<'aaa'>[] = [
  {
    id: 'aaa',
    name: 'Aaa',
  },
];

const activityDefinition: ActivityDef<
  'empty' | 'first' | 'second' | 'third',
  'aaa',
  'a' | 'b'
>[] = [
  { id: 'empty', name: 'Empty', tags: [] },
  { id: 'first', name: 'First', tags: ['aaa'] },
  { id: 'second', name: 'Second', tags: ['aaa'] },
  { id: 'third', name: 'Third', tags: [] },
];

const locationDefinitions: LocationDef<
  'loc1' | 'loc2' | 'loc3',
  'empty' | 'first' | 'second' | 'third',
  'sss'
>[] = [
  { id: 'loc1', name: 'Loc 1' },
  { id: 'loc2', name: 'Loc 2', activities: ['third', 'first'] },
  { id: 'loc3', name: 'Loc 3', activities: ['second'], locations: ['loc1'] },
];

const resourceDefinitions: ResourceDef<'a' | 'b'>[] = [
  { id: 'a', name: 'A' },
  { id: 'b', name: 'B' },
];

const config = {
  activityDefinitions: activityDefinition,
  locationDefinitions: locationDefinitions,
  activityTagDefinitions: tagDefinition,
  resourceDefinitions: resourceDefinitions,
};

const createGame = (startingLocation: 'loc1' | 'loc2' | 'loc3') =>
  new Game(config, {
    parallelActivityTags: ['aaa'],
    emptyActivity: 'empty',
    startingLocation: startingLocation,
  });

void tap.test('Game state - ', group => {
  void group.test('should set starting location', async t => {
    const { gameState } = createGame('loc1');

    t.equal(gameState.currentLocation, 'loc1');
  });

  void group.test(
    'should set starting activity even though location does not provide it',
    async t => {
      const { gameState } = createGame('loc1');

      t.equal(gameState.activeActivity.aaa, 'empty');
    },
  );

  void group.test(
    'should provide available actions based on location',
    async t => {
      const { gameState } = createGame('loc2');

      t.ok(gameState.availableActivitiesByTag('aaa').includes('first'));
    },
  );

  void group.test(
    'should provide available locations based on location',
    async t => {
      const { gameState } = createGame('loc3');

      t.ok(gameState.availableLocations.includes('loc1'));
    },
  );

  void group.test('cannot change location to unavailable one', async t => {
    const { gameState } = createGame('loc3');

    gameState.changeLocation('loc2');

    t.equal(gameState.currentLocation, 'loc3');
  });

  void group.test('can change location to available one', async t => {
    const { gameState } = createGame('loc3');

    gameState.changeLocation('loc1');

    t.equal(gameState.currentLocation, 'loc1');
  });

  void group.test('cannot change activity to unavailable one', async t => {
    const { gameState } = createGame('loc3');

    t.equal(gameState.activeActivity.aaa, 'empty');

    gameState.changeActivity('aaa', 'third');

    t.equal(gameState.activeActivity.aaa, 'empty');
  });

  void group.test('can change activity to available one', async t => {
    const { gameState } = createGame('loc3');

    t.equal(gameState.activeActivity.aaa, 'empty');

    gameState.changeActivity('aaa', 'second');

    t.equal(gameState.activeActivity.aaa, 'second');
  });

  void group.test(
    'activity will change to empty if moving to location which does not provide given activity',
    async t => {
      const { gameState } = createGame('loc3');

      gameState.changeActivity('aaa', 'second');
      t.equal(gameState.activeActivity.aaa, 'second');

      gameState.changeLocation('loc1');

      t.equal(gameState.activeActivity.aaa, 'empty');
    },
  );

  group.end();
});
