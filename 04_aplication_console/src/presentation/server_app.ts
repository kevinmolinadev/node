interface ServerRunOptions {
    limit: number,
    base: number,
    create: boolean
    outputDir: string,
    name: string,
}

export class ServerApp {
    static run({ limit, base, create, outputDir, name }: ServerRunOptions) {
        console.log("Server running!");
        console.log({ limit, base, create, outputDir, name });
    }
}