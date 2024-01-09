import { envs } from "../../src/config/envs";
import { Server } from "../../src/presentation/server";

describe("server.ts", () => {
    const service = {
        use: jest.fn(),
        listen: jest.fn()
    } as any
    test("should execute method start", () => {
        const server = new Server({
            service,
            port: envs.PORT,
            routers: []
        });

        server.start();

        expect(service.use).toHaveBeenCalledTimes(3);
        expect(service.use).toHaveBeenLastCalledWith("/api", []);

        expect(service.listen).toHaveBeenCalledTimes(1);
        expect(service.listen).toHaveBeenCalledWith(3001,expect.any(Function));
    });
})