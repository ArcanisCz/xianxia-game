import { keyBy, mapKeys, mapValues } from 'lodash';
import { Location, LocationDef } from './location';
import { Activity, ActivityDef } from './activity';

export function initGame<
  LocationKeys extends string,
  ActivityKeys extends string,
  ActivityTagKeys extends string,
  LocationType extends Location<LocationKeys, ActivityKeys, ActivityTagKeys>,
  ActivityType extends Activity<ActivityKeys, ActivityTagKeys>,
>(
  locationDefinitions: LocationDef<LocationKeys, ActivityKeys>[],
  activityDefinitions: ActivityDef<ActivityKeys, ActivityTagKeys>[],
): {
  locations: {
    [key in LocationKeys]: LocationType;
  };
  activities: {
    [key in ActivityKeys]: ActivityType;
  };
} {
  const activitiesMap = mapValues(keyBy(activityDefinitions, 'id'), def => {
    return new Activity({
      id: def.id,
      name: def.name,
      tags: new Set(def.tags),
    });
  }) as { [key in ActivityKeys]: ActivityType };

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

  return { locations: locationsMap, activities: activitiesMap };
}
