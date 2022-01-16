import { setGlobalConfig } from '@storybook/testing-react';
import * as globalStorybookConfig from './preview';

// This allows global decorators (those defined in preview.js)
// to be applied when a test calls composeStories.
setGlobalConfig(globalStorybookConfig);
