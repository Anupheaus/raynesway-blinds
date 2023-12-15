export function matchPath(path: string, pathname: string) {
  if (path === '/') return pathname === '/';
  if (pathname === '/') return false;
  const shortPath = pathname.length > path.length ? path : pathname;
  const longPath = pathname.length <= path.length ? path : pathname;
  return longPath.toLowerCase().startsWith(shortPath.toLowerCase());
}
