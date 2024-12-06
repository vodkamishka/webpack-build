import webpack from 'webpack';
import {buildWebpack} from "./config/build/buildWebpack";
import path from "node:path";
import {BuildMode, BuildPlatform} from "./config/build/types/types";

export interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    analyzer?: boolean
    platform?: BuildPlatform
}

export default (env: EnvVariables) => {

    const paths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src')
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        platform: env.platform ?? 'desktop',
        analyzer: env.analyzer
    });

   return config;
}