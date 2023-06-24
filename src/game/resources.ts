import { ResourceDef } from 'core/resource';

export type ResourceKeys = 'qi' | 'gold';
export const resourceDefinitions: ResourceDef<ResourceKeys>[] = [
  {
    id: 'qi',
    name: 'Qi',
  },
  {
    id: 'gold',
    name: 'Gold',
  },
];
