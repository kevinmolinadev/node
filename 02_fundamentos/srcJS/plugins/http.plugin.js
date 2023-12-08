const htttClient = {
    get: async (url) => {
        const response = await fetch(url)
        return response.json();
    },
    post: ({ objet }) => {
        return objet;
    },
    put: (id, objet) => {
        return {
            id,
            objet
        }
    },
    delete: ({ id }) => {
        return id
    }
}
module.exports = {
    htttClient,
}