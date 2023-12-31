const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  return {
    entry: { index: './src/index.tsx' },
    devtool: 'source-map',
    target: 'web',
    output: {
      path: path.resolve(__dirname, './public'),
      publicPath: '/',
    },
    module: {
      rules: [{
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
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './public/index.html'),
        filename: 'index.html',
        inject: 'head',

        xhtml: true,
        cache: false,
        hash: true,
      }),
      new ProgressPlugin(),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        'react': path.join(__dirname, './node_modules/react'),
        'react-dom': path.join(__dirname, './node_modules/react-dom'),
      },
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, './public'),
      },
      compress: true,
      port: 9000,
      historyApiFallback: true,
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
  };
};

