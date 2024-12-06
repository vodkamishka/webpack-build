import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {DefinePlugin, ProgressPlugin, HotModuleReplacementPlugin} from "webpack";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "node:path";
import CopyPlugin = require("copy-webpack-plugin");


export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions) {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: any = [
        new HtmlWebpackPlugin({
            template: paths.html, // генерирует
            //html и вставляет содержимое папки build
            favicon: path.resolve(paths.public, 'favicon.ico'),
            inject: 'body' //вставляет содержимое папки build в тег body
        }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform)
        }), // задает глобальные константы
    ]

    if (isDev) {
        plugins.push(
            new ProgressPlugin(), //отображает прогресс сборки
            new ReactRefreshWebpackPlugin(), // не ребуется перезагрузка страницы для обновления изменений
            new ForkTsCheckerWebpackPlugin() //  асинхронно проверяет типы TypeScript, не замедляя сборку
        )
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: '[contenthash].css'
            }), // при сборке стили выносит в отдельные css файлы
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
                ],
            })
        )

        if (analyzer) {
            new BundleAnalyzerPlugin() // анализирует размер сборки
        }

    }

    return plugins;
}