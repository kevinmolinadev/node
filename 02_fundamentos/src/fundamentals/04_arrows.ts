import { Day } from "./03_callback";

const days: Day[] = [
    {
        id: 1,
        name: "Lunes"
    },
    {
        id: 2,
        name: "Martes"
    }
]
export const getItemById = (id: number, callback: ((error?: string, day?: Day) => void)) => {
    const day = days.find(day => day.id === id);
    if (!day) return callback("No existe ese dia");
    return callback(undefined, day);
}