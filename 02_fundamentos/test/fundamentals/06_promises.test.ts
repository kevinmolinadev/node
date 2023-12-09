import { fetchPokemonNameById } from "../../src/fundamentals/06_promises";

describe("06_promise", () => {
    test("fetchPokemonNameById should return a pokemon name", async () => {
        const pokemonId = 19;
        const pokemonName = await fetchPokemonNameById(pokemonId);
        expect(pokemonName).toBe("rattata");
    });
    test("should return a error when id don't exist", async () => {
        const pokemonId = 100000000
        try {
            await fetchPokemonNameById(pokemonId)
        } catch (error: any) {
            expect(error.message).toBe(`El pokemon con el id ${pokemonId} no existe`);
        }
    });
})