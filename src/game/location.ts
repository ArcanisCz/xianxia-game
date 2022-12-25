import { Location, LocationDef } from 'core/location';
import { ActivityTime } from '../core/activity';
import { activities, ActivityKeys } from './activities';

export type LocationKeys = 'empty' | 'graveyard' | 'sect';

const definitions: LocationDef<LocationKeys, ActivityKeys>[] = [
  {
    id: 'graveyard',
    name: 'Graveyard',
    activities: {
      day: ['raid'],
    },
  },
  {
    id: 'sect',
    name: 'Sect',
    activities: {
      night: ['meditate'],
    },
  },
];

export type GameLocation = Location<LocationKeys, ActivityKeys>;

export const locations: {
  [key in LocationKeys]: GameLocation;
} = definitions.reduce((acc, def) => {
  acc[def.id] = new Location({
    id: def.id,
    name: def.name,
    activities: {
      [ActivityTime.Day]: (def.activities[ActivityTime.Day] || []).map(
        a => activities[a],
      ),
      [ActivityTime.Night]: (def.activities[ActivityTime.Night] || []).map(
        a => activities[a],
      ),
    },
  });

  return acc;
}, {} as { [key in LocationKeys]: GameLocation });
