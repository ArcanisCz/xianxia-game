import tap from 'tap';
import { ActivityDef } from './activity';
import { ActivityTagDef } from './activityTag';
import { Game } from './game';

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
    'first' | 'second' | 'third',
    'aaa' | 'bbb'
  >[] = [
    { id: 'first', name: 'First', tags: ['bbb', 'aaa'] },
    { id: 'second', name: 'Second', tags: ['aaa'] },
    { id: 'third', name: 'Third', tags: [] },
  ];

  void group.test('should instantiate tags', async t => {
    const { gameRegistry } = new Game(
      tagDefinition,
      [],
      [],
      ['aaa', 'bbb'],
      '',
      '',
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
      tagDefinition,
      [],
      activityDefinition,
      ['aaa', 'bbb'],
      'first',
      '',
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

  void group.test('should instantiate locations');

  group.end();
});
