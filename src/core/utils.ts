import { keyBy, mapKeys, mapValues } from 'lodash';
import { Location, LocationDef } from './location';
import { Activity, ActivityDef } from './activity';
import { ActivityTagDef } from './activityTag';

export function initGame<
  LocationKeys extends string,
  ActivityKeys extends string,
  ActivityTagKeys extends string,
  ActivityTagType extends ActivityTagDef<ActivityTagKeys>,
  LocationType extends Location<LocationKeys, ActivityKeys, ActivityTagKeys>,
  ActivityType extends Activity<ActivityKeys, ActivityTagKeys>,
>(
  activityTagDefinitions: ActivityTagDef<ActivityTagKeys>[],
  locationDefinitions: LocationDef<LocationKeys, ActivityKeys>[],
  activityDefinitions: ActivityDef<ActivityKeys, ActivityTagKeys>[],
): {
  activityTags: {
    [key in ActivityTagKeys]: ActivityTagType;
  };
  locations: {
    [key in LocationKeys]: LocationType;
  };
  activities: {
    [key in ActivityKeys]: ActivityType;
  };
} {
  const activityTagsMap = mapValues(
    keyBy(activityTagDefinitions, 'id'),
    def => def,
  ) as { [key in ActivityTagKeys]: ActivityTagType };

  const activitiesMap = mapValues(
    keyBy(activityDefinitions, 'id'),
    def =>
      new Activity({
        id: def.id,
        name: def.name,
        tags: new Set(def.tags),
      }),
  ) as { [key in ActivityKeys]: ActivityType };

  const locationsArray = locationDefinitions.map(
    def =>
      new Location({
        id: def.id,
        name: def.name,
        activities: (def.activities || []).map(a => activitiesMap[a]),
        locations: [],
      }),
  );

  const locationsMap = mapKeys(locationsArray, 'id') as {
    [key in LocationKeys]: LocationType;
  };

  locationDefinitions.forEach(def => {
    const loc = locationsMap[def.id];

    // @ts-ignore
    loc['locations'] = (def.locations || []).map(a => locationsMap[a]);
  });

  return {
    locations: locationsMap,
    activities: activitiesMap,
    activityTags: activityTagsMap,
  };
}
