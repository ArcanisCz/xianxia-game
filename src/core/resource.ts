export type ResourceDef<ResourceKeys> = {
  id: ResourceKeys;
  name: string;
};

export class Resource<ResourceKeys> {
  constructor(init: { id: ResourceKeys; name: string }) {
    this.name = init.name;
    this.id = init.id;
  }

  name: string;
  id: ResourceKeys;
}
