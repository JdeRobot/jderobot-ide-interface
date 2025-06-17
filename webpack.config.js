const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const aliases = () => {
  const aliasConfig = {
    //REACT
    react: path.resolve(__dirname, "./node_modules/react"),

    // REACT components
    Components: path.resolve(__dirname, "src/components/"),
    Utils: path.resolve(__dirname, "src/utils/"),
    Types: path.resolve(__dirname, "src/types/"),
    Assets: path.resolve(__dirname, "src/assets/"),
  };

  return aliasConfig;
};

module.exports = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    globalObject: "this",
  },
  resolve: {
    alias: aliases(),
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    modules: ["node_modules", path.resolve(__dirname, "node_modules")],
  },
  externals: {
    // Use external version of React
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [{ name: "preset-default", removeViewBox: false }],
              },
            },
          },
          "file-loader",
        ],
      },
    ],
  },
  devtool: "inline-source-map",
};
