import { SaveTable } from "../../../src/domain/use_cases/save_table.use_case";
import fs from "fs"

describe("save_table", () => {

    const customOptions = {
        fileContent: 'custom content',
        fileOutput: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    }

    const customFilePath = `${customOptions.fileOutput}/${customOptions.fileName}.txt`;

    afterEach(() => {
        const outputDirExits = fs.existsSync("tables");
        const outputDirCustmExists = fs.existsSync("custom-outputs");
        if (outputDirExits) fs.rmSync("tables", { recursive: true });
        if (outputDirCustmExists) fs.rmSync("custom-outputs", { recursive: true });
    });

    test('should save file with default values', () => {
        const saveFile = new SaveTable();
        const filePath = 'tables/table.txt';
        const options = {
            fileContent: 'test content',
        }

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {

        const saveFile = new SaveTable();

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);

    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveTable();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing'); }
        );

        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);

        mkdirSpy.mockRestore();

    });


    test('should return false if file could not be created', () => {

        const saveFile = new SaveTable();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writing error message'); }
        );

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect(result).toBe(false);

        writeFileSpy.mockRestore();
    });


})