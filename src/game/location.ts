import { Location, LocationDef } from 'core/location';
import { mapKeys } from 'lodash';
import { activities, ActivityKeys } from './activities';
import { ActivityTagKeys } from './activityTags';

export type LocationKeys = 'empty' | 'graveyard' | 'sect';

// TODO: how to type error non existing location and also duplicate?
const definitions: LocationDef<LocationKeys, ActivityKeys>[] = [
  {
    id: 'graveyard',
    name: 'Graveyard',
    activities: ['raid'],
    locations: ['sect'],
  },
  {
    id: 'sect',
    name: 'Sect',
    activities: ['meditate'],
    locations: ['graveyard'],
  },
];

export type GameLocation = Location<
  LocationKeys,
  ActivityKeys,
  ActivityTagKeys
>;

export const locations: {
  [key in LocationKeys]: GameLocation;
} = (() => {
  const array = definitions.map(
    def =>
      new Location({
        id: def.id,
        name: def.name,
        activities: (def.activities || []).map(a => activities[a]),
        locations: [],
      }),
  );

  const map = mapKeys(array, 'id') as { [key in LocationKeys]: GameLocation };

  definitions.forEach(def => {
    const loc = map[def.id];

    // @ts-ignore
    loc['locations'] = (def.locations || []).map(a => map[a]);
  });

  return map;
})();
