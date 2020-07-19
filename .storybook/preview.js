import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '!style-loader!css-loader!sass-loader!./styles.scss';

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
    defaultViewport: 'pixel2',
  },
});