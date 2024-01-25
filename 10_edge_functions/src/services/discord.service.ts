export class DiscordService {
    constructor(
        private readonly url: string
    ) { }

    async sendMessage(message: string) {
        return fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: message,
            })
        })
    }
}