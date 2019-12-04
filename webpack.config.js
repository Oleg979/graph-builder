const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./entry.ts",
  output: {
    filename: "app.js",
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin("./style.css")],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
