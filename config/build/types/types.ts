interface buildPaths {
    entry: string;
    html: string;
    output: string;
    public: string;
    src: string;
}

export type BuildMode = 'production' | 'development';
export type BuildPlatform = 'mobile' | 'desktop';
export interface BuildOptions {
    port: number;
    paths: buildPaths;
    mode: BuildMode
    platform: BuildPlatform,
    analyzer?: boolean;
}