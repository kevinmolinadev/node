import { envs } from "./envs.plugin";

describe("envs.plugin.ts", () => {
    test("should return objet with enviroments", () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'test@gmail.com',
            MAILER_EMAIL_KEY: 'test123',
            PRODUCTION: false,
            MONGO_URL: 'mongodb://test:test123@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'test',
            MONGO_PASS: 'test123',
            POSTGRES_URL: 'postgresql://test:test123@localhost:5432/NOC-TEST',
            POSTGRES_DB_NAME: 'NOC-TEST',
            POSTGRES_USER: 'test',
            POSTGRES_PASS: 'test123'
        })
    });

    test("should return a error where enviroment is a other value", async () => {
        jest.resetModules();
        process.env.PORT = "KEVIN";
        try {
            await import("./envs.plugin");
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });
})