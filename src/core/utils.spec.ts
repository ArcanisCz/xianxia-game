import tap from 'tap';
import { ActivityDef } from './activity';
import { ActivityTagDef } from './activityTag';
import { initGame } from './utils';

void tap.test('initGame()', group => {
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
    const { activityTags } = initGame(tagDefinition, [], []);

    for (const tag of tagDefinition) {
      t.equal(
        activityTags[tag.id].id,
        tag.id,
        'Tag id should match a definition',
      );
      t.equal(
        activityTags[tag.id].name,
        tag.name,
        'Tag name should match a definition',
      );
    }
  });

  void group.test('should instantiate activities', async t => {
    const { activities } = initGame(tagDefinition, [], activityDefinition);

    for (const activity of activityDefinition) {
      t.equal(
        activities[activity.id].id,
        activity.id,
        'Activity id should match a definition',
      );
      t.equal(
        activities[activity.id].name,
        activity.name,
        'Activity name should match a definition',
      );
      t.equal(activities[activity.id].tags.size, activity.tags.length);
      for (const tag of activity.tags) {
        t.ok(
          activities[activity.id].tags.has(tag),
          'Activity should have a proper tags',
        );
      }
    }
  });

  void group.test('should instantiate locations');

  group.end();
});
