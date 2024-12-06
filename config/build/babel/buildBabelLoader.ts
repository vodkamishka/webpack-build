import {removeDataTestIdBabelPlugin} from "./removeDataTestIdBabelPlugin";
import {BuildOptions} from "../types/types";

export function buildBabelLoader({mode}: BuildOptions) {
    const isProd = mode === 'production';

    const plugins = [];

    if (isProd) {
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ['data-testid']
            }
        ])
    }

    return {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [{
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-env',
                    "@babel/preset-typescript",
                    ["@babel/preset-react", {"runtime": "automatic"}]
                ],
                ...(plugins ? { plugins } : {})
            }
        }]
    }
}