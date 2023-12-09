import { days } from "../../src/fundamentals/02_desestructurin";

describe("02_desesctructurin", () => {
    test("The list should contain the days of the week ", () => {
        const daysOfWeek: string[] = [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo",
        ];

        daysOfWeek.forEach((item, index) => {
            expect(days[index]).toBe(item)
        });
    });
})