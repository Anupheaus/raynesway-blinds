import { createComponent, createRootThemeProvider } from '@anupheaus/react-ui';
import { BrowserRouter } from 'react-router-dom';
import { Content } from './Content';
import { theme } from './theme';
import { TitleBar } from './title-bar';
import { SubMenuProvider } from './sub-menu-provider';

const GlobalTheme = createRootThemeProvider({
  globalStyles: {
    'html, body, root': {
      position: 'relative',
      height: '100%',
      width: '100%',
      padding: 0,
      margin: 0,
      fontFamily: 'Mulish, sans-serif',
      fontSize: 16,
      overflow: 'hidden',
      userSelect: 'none',
      backgroundColor: theme.background.primary,
      color: '#373B4D',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      '--title-area-height': `${theme.positioning.desktop.titleBarAreaHeight}px`,
      '--menu-area-height': `${theme.positioning.desktop.menuAreaHeight}px`,
      '--sub-menu-area-height': `${theme.positioning.desktop.subMenuAreaHeight}px`,

      [theme.mediaMaxWidth]: {
        '--title-area-height': `${theme.positioning.mobile.titleBarAreaHeight}px`,
        '--menu-area-height': `${theme.positioning.mobile.menuAreaHeight}px`,
        '--sub-menu-area-height': `${theme.positioning.mobile.subMenuAreaHeight}px`,
      },
    },
    h1: {
      fontSize: 34,
      textShadow: '0px 1px 3px rgba(0 0 0 / 30%)',
      marginBlock: 0,
    },
    h2: {
      fontSize: 22,
      textShadow: '0px 1px 3px rgba(0 0 0 / 30%)',
      marginBlock: 0,
      fontWeight: 'normal',
    },
  },
});

export const App = createComponent('App', () => {

  return (
    <GlobalTheme>
      <BrowserRouter>
        <SubMenuProvider>
          <TitleBar />
          <Content />
        </SubMenuProvider>
      </BrowserRouter>
    </GlobalTheme>
  );
});
