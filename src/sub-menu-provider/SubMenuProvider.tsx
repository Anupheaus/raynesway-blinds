import { createComponent, useForceUpdate } from '@anupheaus/react-ui';
import { ReactNode, useMemo, useRef } from 'react';
import { SubMenuContext, SubMenuContextProps } from './SubMenuContext';
import { PageConfig } from '../pages';
import { useLocation } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

function sameRoot(path: string, pathname: string) {
  const pathRoot = path.toLowerCase().split('/')[1];
  const pathnameRoot = pathname.toLowerCase().split('/')[1];
  return pathRoot === pathnameRoot;
}

export const SubMenuProvider = createComponent('SubMenuProvider', ({
  children,
}: Props) => {
  const { pathname } = useLocation();
  const lastPathnameRef = useRef<string>(pathname);
  const subMenuOptionsRef = useRef<PageConfig[]>([]);
  const update = useForceUpdate();

  if (!sameRoot(lastPathnameRef.current, pathname)) subMenuOptionsRef.current = [];
  lastPathnameRef.current = pathname;

  const context = useMemo<SubMenuContextProps>(() => ({
    setSubMenuOptions: options => {
      if (Reflect.areDeepEqual(subMenuOptionsRef.current, options)) return;
      subMenuOptionsRef.current = options;
      update();
    },
    subMenuOptions: subMenuOptionsRef.current,
  }), [subMenuOptionsRef.current]);


  return (
    <SubMenuContext.Provider value={context}>
      {children}
    </SubMenuContext.Provider>
  );
});
