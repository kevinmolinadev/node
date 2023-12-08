const days = [
    {
        id: 1,
        day: "Lunes"
    },
    {
        id: 2,
        name: "Martes"
    }
]
const getItemById = (id, callback) => {
    const day = days.find(day => day.id === id);
    if (!day) return callback("No existe ese dia");
    return callback(null, day);
}

module.exports = {
    getItemById
}