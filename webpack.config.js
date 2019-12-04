const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["./entry.ts", "./styles/style.scss"],
  output: {
    filename: "./build/app.js"
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
  plugins: [
    new ExtractTextPlugin("./build/style.css"),
    new CopyWebpackPlugin([
      {
        from: "./index.html",
        to: "./build/index.html"
      }
    ])
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
