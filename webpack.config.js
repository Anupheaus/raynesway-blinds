const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const createCommonSettings = isDev => ({
  module: {
    rules: [{
      resourceQuery: /raw/,
      type: 'asset/source',
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        onlyCompileBundledFiles: true,
        compilerOptions: {
          declaration: false,
          noEmit: false,
        },
      },
    }],
  },
  ...(isDev ? {} : {
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            keep_classnames: true,
            keep_fnames: true,
            sourceMap: false,
          },
        }),
      ],
    },
  }),
  plugins: [
    ...(isDev ? [new ProgressPlugin()] : []),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    depth: false,
    entrypoints: false,
    env: false,
    errors: true,
    errorDetails: true,
    hash: false,
    logging: 'error',
    modules: false,
    outputPath: false,
    performance: true,
    providedExports: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: true,
    usedExports: false,
    version: true,
    warnings: true,
  },
});

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const commonSettings = createCommonSettings(isDev);

  return [{
    ...commonSettings,
    name: 'web',
    entry: { index: './src/index.tsx' },
    devtool: 'source-map',
    target: 'web',
    output: {
      path: path.resolve(__dirname, './public'),
      publicPath: '/',
    },
    plugins: [
      ...commonSettings.plugins,
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './public/index.html'),
        filename: 'index.html',
        inject: 'body',
        scriptLoading: 'blocking',
        xhtml: true,
        cache: false,
        hash: true,
      }),
    ],
    resolve: {
      ...commonSettings.resolve,
      alias: {
        'react': path.join(__dirname, './node_modules/react'),
        'react-dom': path.join(__dirname, './node_modules/react-dom'),
      },
      fallback: {
        path: false,
        fs: false,
      }
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, './public'),
      },
      compress: true,
      port: 9000,
      historyApiFallback: true,
    },
  }];
};

