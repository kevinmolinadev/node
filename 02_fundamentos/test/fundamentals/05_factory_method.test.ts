import { FactoryPerson, } from "../../src/fundamentals/05_factory_method";

describe("05_factory_method", () => {
    const getId = () => "1234";
    const getAge = () => 19;
    test("FactoryPerson should return a function", () => {
        const makePerson = FactoryPerson({ getId, getAge });
        expect(typeof makePerson).toBe("function");
    });
    test("should be return a person", () => {
        const makePerson = FactoryPerson({ getId, getAge });
        const person = makePerson({ name: "Kevin", birthdate: "2003-12-06" });
        expect(person).toEqual({
            id: "1234",
            name: "Kevin",
            birthdate: "2003-12-06",
            age: 19
        })
    });
})