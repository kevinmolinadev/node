import { animals } from "../data/animals";

export const findAnimalById = (id: number) => animals.find(item => item.id === id);
