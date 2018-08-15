"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extract_text_webpack_plugin_1 = __importDefault(require("extract-text-webpack-plugin"));
exports.default = {
    entry: ["./styles/main.scss"],
    module: {
        rules: [{
                test: /\.scss$/,
                use: extract_text_webpack_plugin_1.default.extract({
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
        new extract_text_webpack_plugin_1.default("stylesheets/main.css")
    ]
};
//# sourceMappingURL=webpack.config.js.map