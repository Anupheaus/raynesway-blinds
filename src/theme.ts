export const theme = {
  background: {
    primary: '#F3DBB8',
  },
  text: {
    primary: '#373B4D',
    secondary: '#878994',
  },
  button: {
    normal: {
      background: '#4a4f67',
      color: 'white',
    },
    active: {
      background: '#373B4D',
      color: 'white',
    },
  },
  shadows: {
    light: '0 1px 2px rgba(0 0 0 / 15%), 0 3px 6px rgba(0 0 0 / 12%)',
    medium: '0 1px 3px rgba(0 0 0 / 30%), 0 6px 12px rgba(0 0 0 / 24%)',
    heavy: '',
  },
  scrollbars: {
    styling: {
      '&::-webkit-scrollbar': {
        width: 16,
        height: 16,
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(0 0 0 / 30%)',
        borderRadius: 8,
        minHeight: 40,
        border: 'solid 4px transparent',
        backgroundClip: 'padding-box',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: 'rgba(0 0 0 / 30%)',
      },
    },
  },
  mediaMaxWidth: '@media (max-width: 600px)',
  positioning: {
    desktop: {
      titleBarAreaHeight: 150,
      menuAreaHeight: 50,
      subMenuAreaHeight: 50,
    },
    mobile: {
      titleBarAreaHeight: 190,
      menuAreaHeight: (34 * 5),
      subMenuAreaHeight: 0, // (34 * 5),

    },
  },
};