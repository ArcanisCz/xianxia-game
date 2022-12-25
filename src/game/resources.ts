import { Resource, ResourceDef } from 'core/resource';

export type ResourceKeys = 'qi' | 'rest';
const definitions: ResourceDef<ResourceKeys>[] = [
  {
    id: 'qi',
    name: 'Qi',
  },
  {
    id: 'rest',
    name: 'Rest',
  },
];

export type GameResources = Resource<ResourceKeys>;

export const activities: { [key in ResourceKeys]: GameResources } =
  definitions.reduce((acc, def) => {
    acc[def.id] = new Resource(def);

    return acc;
  }, {} as { [key in ResourceKeys]: GameResources });
