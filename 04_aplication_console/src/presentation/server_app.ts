import { CreateTable, SaveTable } from "../domain/use_cases";

interface ServerRunOptions {
    limit: number,
    base: number,
    create: boolean
    outputDir: string,
    name: string,
}

export class ServerApp {
    static run({ limit, base, create, outputDir, name }: ServerRunOptions) {
        const table = new CreateTable().execute({ base, limit });
        console.log(table);
        if (create) {
            new SaveTable().execute({ fileContent: table, fileName: name, fileOutput: outputDir });
            console.log("File created!");
        }
    }
}