export const htttClient = {
    get: async (url: string) => {
        const response = await fetch(url)
        return response.json();
    },
    post: (url: string, objet: any) => {
        throw new Error("Method not implemented");
    },
    put: (id: number, objet: any) => {
        throw new Error("Method not implemented");
    },
    delete: (id: number) => {
        throw new Error("Method not implemented");
    }
}
