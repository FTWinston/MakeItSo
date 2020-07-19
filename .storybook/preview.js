import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS, DEFAULT_VIEWPORT } from '@storybook/addon-viewport';

const viewports = {
  ...INITIAL_VIEWPORTS,
  pixel2: {
    name: 'Pixel 2',
    styles: {
      width: '411px',
      height: '731px',
    }
  }
}
 
addParameters({
  viewport: {
    viewports,
    defaultViewport: DEFAULT_VIEWPORT,
  },
});