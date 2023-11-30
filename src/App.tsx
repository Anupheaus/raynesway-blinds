import { createComponent, createRootThemeProvider } from '@anupheaus/react-ui';
import { BrowserRouter } from 'react-router-dom';
import { Content } from './Content';
import { theme } from './theme';
import { TitleBar } from './title-bar';

const GlobalTheme = createRootThemeProvider({
  globalStyles: {
    'html, body, root': {
      height: '100%',
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
    },
  },
});

export const App = createComponent('App', () => {

  return (
    <GlobalTheme>
      <BrowserRouter>
        <TitleBar />
        <Content />
      </BrowserRouter>
    </GlobalTheme>
  );
});
