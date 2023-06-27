import React from 'react';
import { formatResourceValue } from './utils';

export const ResourceGain: React.FC<{ gain: number }> = ({ gain }) => {
  if (gain === 0) {
    return <span />;
  }

  return <span>+{formatResourceValue(gain)}/s</span>;
};
