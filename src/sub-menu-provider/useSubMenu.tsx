import { useContext, useLayoutEffect } from 'react';
import { SubMenuContext } from './SubMenuContext';
import { PageConfig } from '../pages';
import { useLocation } from 'react-router-dom';

function matchPath(path: string, pathname: string): boolean {
  return pathname.toLowerCase().endsWith(path.toLowerCase());
}

function allowSetSubMenuOptions(options: PageConfig[], isActive: boolean): PageConfig | undefined {
  const { setSubMenuOptions } = useContext(SubMenuContext);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (!isActive) return;
    setSubMenuOptions(options);
  }, [isActive]);

  return options.find(({ path }) => matchPath(path, pathname));
}

export function useSubMenu(): PageConfig[];
export function useSubMenu(options: PageConfig[], isActive: boolean): PageConfig | undefined;
export function useSubMenu(options?: PageConfig[], isActive?: boolean): PageConfig | undefined | PageConfig[] {
  if (options instanceof Array && typeof isActive === 'boolean') return allowSetSubMenuOptions(options, isActive);
  const { subMenuOptions } = useContext(SubMenuContext);
  return subMenuOptions;
}
