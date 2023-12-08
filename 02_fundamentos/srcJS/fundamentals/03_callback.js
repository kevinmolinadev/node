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
function getItemById(id, callback) {
    const day = days.find(function (day) {
        return day.id === id;
    })
    !day
        ? callback("No existe ese dia")
        : callback(null, day);
}

module.exports = {
    getItemById
}