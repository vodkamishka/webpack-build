import {BuildOptions} from "./types/types";

export function buildResolvers(options: BuildOptions) {
    return {
        extensions: ['.tsx', '.ts', '.js'], // вебпак прнимает импорт файлов с такими расширениями
        alias: {
            '@': options.paths.src,
            'assets': `${options.paths.src}/assets`,
        }
    }
}