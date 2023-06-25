import { StageDef } from 'core';
import { ResourceKeys } from './resources';

export type StageKeys = 'qi-ref-1' | 'qi-ref-2' | 'qi-ref-3';
export const stageDefinitions: StageDef<ResourceKeys, StageKeys>[] = [
  {
    id: 'qi-ref-1',
    name: 'Qi Refining 1',
    nextStage: 'qi-ref-2',
    effects: [
      {
        resource: 'qi',
        resourceTarget: 'max',
        value: { baseAmnt: 10 },
      },
    ],
  },
  {
    id: 'qi-ref-2',
    name: 'Qi Refining 2',
    nextStage: 'qi-ref-3',
    effects: [
      {
        resource: 'qi',
        resourceTarget: 'max',
        value: { baseAmnt: 20 },
      },
    ],
  },
  {
    id: 'qi-ref-3',
    name: 'Qi Refining 3',
    effects: [
      {
        resource: 'qi',
        resourceTarget: 'max',
        value: { baseAmnt: 30 },
      },
    ],
  },
];
