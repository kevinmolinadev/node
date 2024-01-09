import { Router, } from "express";
import { Server } from "../src/presentation/server";
jest.mock("../src/presentation/server");

describe("App.ts", () => {
    test("should  create instance of Server with dependencies", async () => {

        await import("../src/app");

        expect(Server).toHaveBeenCalled();
        expect(Server).toHaveBeenCalledWith({
            port: 3001,
            routers: expect.arrayContaining([
                expect.any(Function),
                expect.any(Function)
            ]),
            service: expect.any(Function)
        });

        expect(Server.prototype.start).toHaveBeenCalled();
    });
})