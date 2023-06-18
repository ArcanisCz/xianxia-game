import { ResourceDef } from 'core/resource';

export type ResourceKeys = 'qi' | 'rest';
export const resourceDefinitions: ResourceDef<ResourceKeys>[] = [
  {
    id: 'qi',
    name: 'Qi',
  },
  {
    id: 'rest',
    name: 'Rest',
  },
];
