import { enableMapSet } from 'immer';
import { ThemeProvider, theme } from '../src/lib/mui';
import '../src/language';
import '../src/base.css';

enableMapSet();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen'
}

export const decorators = [
  (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
  ),
];
