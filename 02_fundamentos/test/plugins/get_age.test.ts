import { getAge } from "../../src/plugins";

describe("plugins/get-age", () => {
    test("should return type number", () => {
        const bithdate = "2003-12-06";
        const age = getAge(bithdate);
        expect(typeof age).toBe("number");
    });

    test("should be return 0", () => {
        //Use SpyOn: Espias sobre un test, Los SpyOn nos permiten modificar el "ADN" de un objeto y canbiar la logica de un methodo para el test
        jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2003); //Aqui canbiamos el funcionamiento de getFullYear para que devulve 2003 para este test
        
        const bithdate = "2003-12-06";
        const age = getAge(bithdate);
        
        expect(age).toBe(0);
    });
})