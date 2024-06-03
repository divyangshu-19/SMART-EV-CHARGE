const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");

const extensions = [".js", ".jsx"];

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "build"),
  },
  resolve: { 
    extensions ,
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "stream": require.resolve("stream-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "http": require.resolve("stream-http"),
      "net": require.resolve("net-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "crypto": require.resolve("crypto-browserify")
      
    }

  },
  devServer: {
    client: {
      overlay: false,
    },
    historyApiFallback: true, 
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-react", { runtime: "automatic" }]],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin({ extensions }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  stats: "minimal",
};
