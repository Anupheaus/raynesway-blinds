import { createComponent, createRootThemeProvider, Carousel, createStyles } from '@anupheaus/react-ui';
import { theme } from './theme';
import { TitleBar } from './title-bar';

const imageURLs = [
  './images/first-image.webp',
  './images/second-image.webp',
  './images/third-image.webp',
  './images/fourth-image.webp',
  './images/fifth-image.webp',
  './images/sixth-image.webp',
];

const useStyles = createStyles({
  carousel: {
    opacity: 0.5,
  },
});

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
  const { css } = useStyles();
  return (
    <GlobalTheme>
      <TitleBar />
      <Carousel imageURLs={imageURLs} intervalMS={7000} transitionDurationMS={3000} className={css.carousel} />
    </GlobalTheme>
  );
});
