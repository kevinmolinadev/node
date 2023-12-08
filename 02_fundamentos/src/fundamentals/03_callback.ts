export interface Day {
    id: number,
    name: string
}
const days: Day[] = [
    { id: 1, name: "Lunes" },
    { id: 2, name: "Martes" },
    { id: 3, name: "Miércoles" },
    { id: 4, name: "Jueves" },
    { id: 5, name: "Viernes" },
    { id: 6, name: "Sábado" },
    { id: 7, name: "Domingo" },
];

export const getDayById = (id: number, callback: ((error?: string, day?: Day) => void)) => {
    const day = days.find((day) => {
        return day.id === id;
    })
    !day
        ? callback(`El dia con el ${id} no existe`)
        : callback(undefined, day);
}
