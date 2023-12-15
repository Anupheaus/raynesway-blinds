import { createContext } from 'react';
import { PageConfig } from '../pages';

export interface SubMenuContextProps {
  setSubMenuOptions(pages: PageConfig[]): void;
  subMenuOptions: PageConfig[];
}

export const SubMenuContext = createContext<SubMenuContextProps>({
  setSubMenuOptions: () => void 0,
  subMenuOptions: [],
});