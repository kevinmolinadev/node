import { findAnimalById } from "./services/animal.service";


const animal = findAnimalById(3);

console.log(animal?.name ?? "Animal not found")