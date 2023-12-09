import { message } from "../../src/fundamentals/01_template";

describe("01_template", () => {
    test("should be containt 'Buenos dias, '", () => {
        expect(message).toContain('Buenos dias,');
    });
    test("should be contain '{{name}}'", () => {
        expect(message).toMatch(/{{name}}/);
        expect(message).toContain("{{name}}")
    });
});