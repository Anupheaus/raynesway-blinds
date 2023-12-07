export const theme = {
  background: {
    primary: '#F3DBB8',
  },
  text: {
    primary: '#373B4D',
    secondary: '#878994',
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
};