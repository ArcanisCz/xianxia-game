import { observable, makeObservable, action } from 'mobx';
import { Activity } from './activity';

export class Game {
  constructor() {
    makeObservable(this);
  }
  @observable
  public idleActivity: Activity;
  @observable
  public activeActivity: Activity;

  @action
  init(idleActivity: Activity, activeActivity: Activity) {
    this.activeActivity = activeActivity;
    this.idleActivity = idleActivity;
  }
}
