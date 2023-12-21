import { CreateTable } from "../../src/domain/use_cases/create_table.use_case";
import { SaveTable } from "../../src/domain/use_cases/save_table.use_case";
import { ServerApp } from "../../src/presentation/server_app";
import fs from 'fs';

describe('Server App', () => {
    const options = {
        base: 2,
        limit: 10,
        create: true,
        outputDir: 'test-destination',
        name: 'test-filename',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })

    afterEach(() => {
        const outputDirExists = fs.existsSync(options.outputDir);
        if (outputDirExists) fs.rmSync(options.outputDir, { recursive: true });
    });


    test('should create ServerApp instance', () => {

        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');

    });


    test('should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveTable.prototype, 'execute');

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenLastCalledWith("File created!");

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        });

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileOutput: options.outputDir,
            fileName: options.name,
        });

    });


    test('should run with custom values mocked', () => {

        const logMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(false);

        console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveTable.prototype.execute = saveFileMock;


        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('1 x 2 = 2');
        expect(createMock).toHaveBeenCalledWith({ "base": options.base, "limit": options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileOutput: options.outputDir,
            fileName: options.name,
        });


    });
});

