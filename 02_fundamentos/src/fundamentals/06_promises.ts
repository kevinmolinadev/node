//El patron adapter se encuentra dentro edl httpClient, donde se maneja toda la logica
import { htttClient as http } from "../plugins";
export const fetchPokemonNameById = async (id: number): Promise<string> => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        const data: any = await http.get(url);
        return data.name;
    } catch (error) {
        throw new Error(`El pokemon con el id ${id} no existe`);
    }
}
