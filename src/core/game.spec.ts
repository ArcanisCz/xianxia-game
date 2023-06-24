import tap from 'tap';
import { ActivityDef } from './activity';
import { ActivityTagDef } from './activityTag';
import { Game } from './game';
import { LocationDef } from './location';

void tap.test('new Game()', group => {
  const tagDefinition: ActivityTagDef<'aaa' | 'bbb'>[] = [
    {
      id: 'aaa',
      name: 'Aaa',
    },
    {
      id: 'bbb',
      name: 'Bbb',
    },
  ];

  const activityDefinition: ActivityDef<
    'empty' | 'first' | 'second' | 'third',
    'aaa' | 'bbb',
    'qi'
  >[] = [
    { id: 'empty', name: 'Empty', tags: [] },
    { id: 'first', name: 'First', tags: ['bbb', 'aaa'] },
    { id: 'second', name: 'Second', tags: ['aaa'] },
    { id: 'third', name: 'Third', tags: [] },
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

  void group.test('should instantiate tags', async t => {
    const { gameRegistry } = new Game(
      {
        activityDefinitions: activityDefinition,
        locationDefinitions: locationDefinitions,
        activityTagDefinitions: tagDefinition,
        resourceDefinitions: [],
      },
      {
        parallelActivityTags: ['aaa', 'bbb'],
        emptyActivity: 'empty',
        startingLocation: '',
      },
    );

    for (const tag of tagDefinition) {
      t.equal(
        gameRegistry.activityTags[tag.id].id,
        tag.id,
        'Tag id should match a definition',
      );
      t.equal(
        gameRegistry.activityTags[tag.id].name,
        tag.name,
        'Tag name should match a definition',
      );
    }
  });

  void group.test('should instantiate activities', async t => {
    const { gameRegistry } = new Game(
      {
        activityDefinitions: activityDefinition,
        locationDefinitions: locationDefinitions,
        activityTagDefinitions: tagDefinition,
        resourceDefinitions: [],
      },
      {
        parallelActivityTags: ['aaa', 'bbb'],
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
      t.equal(
        gameRegistry.activities[activity.id].tags.size,
        activity.tags.length,
      );
      for (const tag of activity.tags) {
        t.ok(
          gameRegistry.activities[activity.id].tags.has(tag),
          'Activity should have a proper tags',
        );
      }
    }
  });

  void group.test('should instantiate locations', async t => {
    const { gameRegistry } = new Game(
      {
        activityDefinitions: activityDefinition,
        locationDefinitions: locationDefinitions,
        activityTagDefinitions: tagDefinition,
        resourceDefinitions: [],
      },
      {
        parallelActivityTags: ['aaa', 'bbb'],
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
