import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from 'react-refresh-typescript';
import {buildBabelLoader} from "./babel/buildBabelLoader";

export type IBuildLoader = Array<{ test: RegExp; type?: string; use?: string[] |
        { loader: string; options?: any }[]; exclude?: RegExp }>

export const buildLoaders = (options: BuildOptions): IBuildLoader => {

    const isDev = options.mode === 'development';

    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
            {
                loader: '@svgr/webpack',
                options:
                    {
                        icon: true,
                        svgConfig: {
                            plugins: [
                                {
                                    name: 'convertColors',
                                    params: {
                                        currentColor: true
                                    }
                                }
                            ]
                        }
                    }
            }
        ],
    }

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

        const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

    const babelLoader = buildBabelLoader(options);

    const tsLoader = {
        // ts-loader умеет работать с JSX
        // если не использовать тайпскипт, то нужен babel-loader
        test: /\.tsx?$/,
        use: [{
            loader: 'ts-loader',
            options: {
                getCustomTransformers: () => ({
                    before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                }),
                transpileOnly: true // позволяет пропустить этап проверки типов (type checking),
                // чтобы ускорить процесс сборки

            }
        }],
        exclude: /node_modules/,
    }

    return [
        svgLoader,
        assetLoader,
        scssLoader,
        //tsLoader,
        babelLoader
    ]
}