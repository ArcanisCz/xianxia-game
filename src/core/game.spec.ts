import tap from 'tap';
import { ActivityDef } from './activity';
import { Game } from './game';
import { LocationDef } from './location';

void tap.test('new Game()', group => {
  const activityDefinition: ActivityDef<
    'empty' | 'first' | 'second' | 'third',
    'qi'
  >[] = [
    { id: 'empty', name: 'Empty' },
    { id: 'first', name: 'First' },
    { id: 'second', name: 'Second' },
    { id: 'third', name: 'Third' },
  ];

  const locationDefinitions: LocationDef<
    'loc1' | 'loc2' | 'loc3',
    'empty' | 'first' | 'second' | 'third',
    's'
  >[] = [
    { id: 'loc1', name: 'Loc 1' },
    { id: 'loc2', name: 'Loc 2', activities: ['third', 'first'] },
    { id: 'loc3', name: 'Loc 3', activities: ['second'], locations: ['loc1'] },
  ];

  void group.test('should instantiate activities', async t => {
    const { gameRegistry } = new Game(
      {
        activityDefinitions: activityDefinition,
        locationDefinitions: locationDefinitions,
        resourceDefinitions: [],
      },
      {
        emptyActivity: 'empty',
        startingLocation: '',
      },
    );

    for (const activity of activityDefinition) {
      t.equal(
        gameRegistry.activities[activity.id].id,
        activity.id,
        'Activity id should match a definition',
      );
      t.equal(
        gameRegistry.activities[activity.id].name,
        activity.name,
        'Activity name should match a definition',
      );
    }
  });

  void group.test('should instantiate locations', async t => {
    const { gameRegistry } = new Game(
      {
        activityDefinitions: activityDefinition,
        locationDefinitions: locationDefinitions,
        resourceDefinitions: [],
      },
      {
        emptyActivity: 'empty',
        startingLocation: '',
      },
    );

    for (const locationDef of locationDefinitions) {
      const locationInstance = gameRegistry.locations[locationDef.id];

      t.equal(
        locationInstance.id,
        locationDef.id,
        'Location id should match a definition',
      );
      t.equal(
        locationInstance.name,
        locationDef.name,
        'Location name should match a definition',
      );
      t.equal(
        locationInstance.activities.length,
        locationDef.activities?.length || 0,
      );
      for (const key in locationDef.activities || []) {
        t.equal(
          locationInstance.activities[key],
          locationDef.activities![key],
          'Location should have a proper activities',
        );
      }

      t.equal(
        locationInstance.locations.length,
        locationDef.locations?.length || 0,
      );
      for (const key in locationDef.locations || []) {
        t.equal(
          locationInstance.locations[key],
          locationDef.locations![key],
          'Location should have a proper locations',
        );
      }
    }
  });

  void group.test('should instantiate resources');

  void group.test('should instantiate effects');

  group.end();
});
