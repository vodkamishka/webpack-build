
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {BuildOptions} from "./types/types";

export const buildDevServer = (options: BuildOptions): DevServerConfiguration => {
    return {
        port: options.port ?? 5000,
        open: true, // запускает браузер, настроенный по дефолту после запуска webpack-dev-server,
        historyApiFallback: true, // без этой настройки не будет работать роутинг,
        hot: true, // включение горячей перезагрузки HotModuleReplacementPlugin
    }
}