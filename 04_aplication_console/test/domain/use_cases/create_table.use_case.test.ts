import { CreateTable } from "../../../src/domain/use_cases/create_table.use_case";

describe("create_table", () => {
    test("should render correctly instance of CreateTable", () => {
        const createTable = new CreateTable();

        expect(createTable).toBeInstanceOf(CreateTable);
    });

    test("should create table with values default", () => {
        const createTable = new CreateTable();
        const options = {
            base: 10
        }

        const table = createTable.execute(options);
        const rowsTable = table.split("\n").length;

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain("10 x 1 = 10");
        expect(table).toContain("10 x 10 = 100");
        expect(rowsTable).toBe(10);
    });

    test('should create table with custom values', () => {
        const createTable = new CreateTable();
        const options = {
            base: 5,
            limit: 20
        }

        const table = createTable.execute(options);
        const rowsTable = table.split('\n').length;

        expect(table).toContain('5 x 1 = 5');
        expect(table).toContain('5 x 10 = 50');
        expect(table).toContain('5 x 20 = 100');
        expect(rowsTable).toBe(options.limit);
    });
})