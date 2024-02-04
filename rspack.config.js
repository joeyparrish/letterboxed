/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: "./src/main.jsx",
  },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
    copy: {
      patterns: [
        { from: 'icon.svg', context: 'public' },
        { from: 'manifest.json', context: 'public' },
        { from: 'service-worker*', context: 'public' },
        { from: 'workbox*', context: 'public' },
        // So arcane, but if we don't specify a "to", it unpacks the folder.
        { from: 'puzzle-sources', context: 'public', to: 'puzzle-sources' },
      ],
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
    ],
  },
};
