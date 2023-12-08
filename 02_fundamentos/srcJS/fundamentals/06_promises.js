//El patron adapter se encuentra dentro edl httpClient, donde se maneja toda la logica
const { http } = require("../plugins")

const fetchTeam = async () => {
    const url = "https://natural-languaje-processing.onrender.com"
    const data = await http.get(url);
    return data.Team;
}
module.exports = {
    fetchTeam 
}