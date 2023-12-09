import { Day, getDayById } from "../../src/fundamentals/03_callback"

describe("03_callback", () => {
    test("should return an object containing a day of the week, by means of an id in the range 1 to 7", (done) => {
        const days: Day[] = [
            { id: 1, name: "Lunes" },
            { id: 2, name: "Martes" },
            { id: 3, name: "Miércoles" },
            { id: 4, name: "Jueves" },
            { id: 5, name: "Viernes" },
            { id: 6, name: "Sábado" },
            { id: 7, name: "Domingo" },
        ];
        const id = 3;

        getDayById(id, (error, day) => {
            expect(day).toEqual(days[id - 1]);
            expect(error).toBeUndefined();
            done();
        });
    });
    test("should flag error where id is greater than 7", (done) => {
        const id = 10;
        getDayById(id, (error, day) => {
            expect(error).toBe(`El dia con el ${id} no existe`);
            expect(day).toBeUndefined();
            done();
        });
    })
})