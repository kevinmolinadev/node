import { htttClient } from "../../src/plugins";

describe("plugins/http", () => {
    test("htttClient should have method: GET, POST, PUT and DELETE",()=>{
        expect(typeof htttClient.get).toBe("function");
        expect(typeof htttClient.post).toBe("function");
        expect(typeof htttClient.put).toBe("function");
        expect(typeof htttClient.delete).toBe("function");
    });
    
    test("htttClient.get() should return data", async () => {
        const resp = await htttClient.get("https://jsonplaceholder.typicode.com/todos/1");
        expect(resp).toEqual({
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: expect.any(Boolean)
        })
    });
}) 