import { UpgradeDef } from 'core';
import { ActivityKeys } from './activities';
import { ResourceKeys } from './resources';

export type UpgradeKeys = 'qi-training';
export const upgradeDefinitions: UpgradeDef<
  ActivityKeys,
  ResourceKeys,
  UpgradeKeys
>[] = [
  {
    id: 'qi-training',
    name: 'Qi Training Manual',
    effects: level => [
      {
        resource: 'qi',
        resourceTarget: 'max',
        value: {
          baseAmnt: level * 10,
        },
      },
    ],
    price: level => ({
      qi: 5 + 2 * level,
    }),
  },
];
