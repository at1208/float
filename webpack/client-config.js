const webpack = require("webpack");
const path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { getWebpackDefinePlugin } = require("./utils");

const emptyFunc = () => {};

module.exports = (env = {}) => {
  const isProd = !!env.prod;
  const isAnalysis = !!env.analysis;
  const mainEntry = ["./src/client/index.js"];

  return {
    mode: isProd ? "production" : "development",
    stats: "errors-warnings",
    target: "web",
    entry: {
      main: mainEntry,
    },
    output: {
      path: path.resolve(__dirname, "../dist/client/assets/static"),
      filename: `bundle-[contenthash].${isProd ? "js" : "mjs"}`,
      chunkFilename: `[id].[chunkhash].${isProd ? "js" : "mjs"}`,
      publicPath: "/static/",
    },
    resolve: {
      alias: {
        "@settings": path.resolve(__dirname, "../settings.js"),
        "@utils": path.resolve(__dirname, "../src/utils"),
        "@components": path.resolve(__dirname, "../src/components"),
        "@pages": path.resolve(__dirname, "../src/pages"),
        "@slices": path.resolve(__dirname, "../src/slices"),
        "@services": path.resolve(__dirname, "../src/services"),
        "@actions": path.resolve(__dirname, "../src/actions"),
        "@hooks": path.resolve(__dirname, "../src/hooks"),
        "@dist": path.resolve(__dirname, "../dist"),
      },
      extensions: [".js"],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    bugfixes: !isProd,
                    targets: isProd
                      ? "defaults, not ie 10-11"
                      : {
                          esmodules: true,
                        },
                  },
                ],
                ["@babel/preset-react"],
              ],
              plugins: [],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(
        getWebpackDefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEV__: !isProd,
          __PROD__: isProd,
          __TEST__: false,
        })
      ),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].[chunkhash].css",
      }),
      new AssetsPlugin({
        removeFullPathAutoPrefix: true,
        filename: "./dist/server/assets.json",
        fileTypes: [isProd ? "js" : "mjs", "css"],
      }),
      // new CopyPlugin({
      //   patterns: [{ from: "../src/public", to: "./" }],
      // }),
      isProd ? new CompressionPlugin() : emptyFunc,
      isAnalysis ? new BundleAnalyzerPlugin() : emptyFunc,
    ],
    devtool: !isProd
      ? "cheap-module-source-map"
      : "hidden-cheap-module-source-map",
    experiments: {
      outputModule: !isProd,
    },
  };
};
