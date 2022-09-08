const path = require('path');
const HtmlwebpackPlugin = require("html-webpack-plugin");
module.exports = {
    devtool: "source-map",
    mode: "development",
    entry: "./js/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "./dist",
        clean: true
    },
    plugins: [
        new HtmlwebpackPlugin(),
    ],
    devServer: {
        devMiddleware: { publicPath: "/dist" },
        static: { directory: path.join(__dirname) },
        hot: true,
    }
}