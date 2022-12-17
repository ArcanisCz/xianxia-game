export type ActivityInit = {
  id: string;
  name: string;
};

export class Activity {
  constructor(init: ActivityInit) {
    this.name = init.name;
    this.id = init.id;
  }

  name: string;
  id: string;
}
