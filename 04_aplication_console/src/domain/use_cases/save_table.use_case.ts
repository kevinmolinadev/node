import fs from "fs";
interface SaveTableModel {
    execute: (options: SaveTableOptions) => boolean
}

interface SaveTableOptions {
    fileContent: string,
    fileName?: string,
    fileOutput?: string,
}

export class SaveTable implements SaveTableModel {
    execute({ fileContent, fileName = "table", fileOutput = "tables" }: SaveTableOptions) {
        try {
            fs.mkdirSync(fileOutput, { recursive: true });
            fs.writeFileSync(`${fileOutput}/${fileName}.txt`, fileContent);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
}