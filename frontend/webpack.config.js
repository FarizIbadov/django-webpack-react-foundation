const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: path.join(__dirname, "src", "index.js"),
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.s?(c|a)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer()],
                sourceMap: true,
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/",
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "main.css" }),
    new CleanWebpackPlugin({}),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "backend", "static"),
  },
  devServer: {
    contentBase: path.resolve(__dirname, "..", "backend", "static"),
    publicPath: "/static/",
    hot: true,
    proxy: {
      "/": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
};
