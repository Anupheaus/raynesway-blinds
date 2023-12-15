import { createContext } from 'react';

export interface TransitionContextProps {
  transitionIndex: number;
  intervalMS: number;
}

export const TransitionContext = createContext<TransitionContextProps>({
  transitionIndex: 0,
  intervalMS: 0,
});