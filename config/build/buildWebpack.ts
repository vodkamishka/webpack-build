import {buildDevServer} from "./buildDevServer";
import {buildLoaders, IBuildLoader} from "./buildLoaders";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";
import {buildPlugins} from "./buildPlugins";

export function buildWebpack(options: BuildOptions): {
    mode: "production" | "development";
    output: { path: string; filename: string; clean: boolean };
    devtool?: string;
    devServer?: DevServerConfiguration<import("express").Application, import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>;
    entry: string;
    resolve: { extensions: string[]; alias: Record<string, string> };
    plugins: any;
    module: { rules: IBuildLoader }
} {

    const {mode, paths} = options

    const isDev = mode === 'development';

    return {
        mode: mode ?? 'development',
            entry: paths.entry,
            output: {
            path: paths.output,
                filename: '[contenthash].js', // каждый раз при изменении кода название файла будет меняться, для подтягивания
                // в бандл актуаотьного кода, а не кешированной версии
                clean: true //перед каждой сборкой папка build будет очищаться, для удаления ненужных файлов отпрежней сборки
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        ...(isDev ? {devtool: 'inline-source-map'} : {}), // настройка для поиска ошибок в бандле 'inline-source-map', // настройка для поиска ошибок в бандле
        ...(isDev ? {devServer: buildDevServer(options)} : {}),
    }
}