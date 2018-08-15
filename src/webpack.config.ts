import path from "path";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default {
  entry: ["./styles/main.scss"],
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          {
            loader: "css-loader",
            options: {
              url: false,
              minimize: true,
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin("stylesheets/main.css")
  ]
};
