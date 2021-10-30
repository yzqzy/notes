const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "system"
 },
  devtool: "source-map",
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true
 },
  module: {
    rules: [
     {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/react"]
         }
       }
     }
    ]
 },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/index.html"
   })
 ],
  externals: ["react", "react-dom", "react-router-dom"]
}
