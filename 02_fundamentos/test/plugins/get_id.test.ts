import { getId } from "../../src/plugins";

describe("plugins/get_id", () => {
    test("getId() should return a ID", () => {
        const id = getId();
        
        expect(typeof id).toBe("string");
        expect(id.length).toBe(36);
    });
})