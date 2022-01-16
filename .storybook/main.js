module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  framework: "@storybook/react",
  core: {
    "builder": "webpack5"
  },
  staticDirs: ['../public'],
  webpackFinal: config => {
    // Modify the SVG matching rule to always use svgr in the same manner as the real site.
    // (Without this, Storybook crashes when it tries to display an SVG.)
    const svgRule = config.module.rules
      .find(rule => rule.oneOf !== undefined)
      .oneOf
      .find(rule => rule.test.toString() === /\.svg$/.toString());

    svgRule.loader = require.resolve('@svgr/webpack')
    delete svgRule.use;
    
    return config;
  }
}