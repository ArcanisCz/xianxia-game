import { mapKeys } from 'lodash';
import { Location, LocationDef } from './location';
import { Activity } from './activity';

export function initLocations<
  LocationKeys extends string,
  ActivityKeys extends string,
  ActivityTagKeys extends string,
>(
  definitions: LocationDef<LocationKeys, ActivityKeys>[],
  activities: {
    [key in ActivityKeys]: Activity<ActivityKeys, ActivityTagKeys>;
  },
) {
  const array = definitions.map(
    def =>
      new Location({
        id: def.id,
        name: def.name,
        activities: (def.activities || []).map(a => activities[a]),
        locations: [],
      }),
  );

  const map = mapKeys(array, 'id') as {
    [key in LocationKeys]: Location<
      LocationKeys,
      ActivityKeys,
      ActivityTagKeys
    >;
  };

  definitions.forEach(def => {
    const loc = map[def.id];

    // @ts-ignore
    loc['locations'] = (def.locations || []).map(a => map[a]);
  });

  return map;
}
