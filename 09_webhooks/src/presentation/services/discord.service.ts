export class DiscordService {
    constructor(
        private readonly url: string
    ) { }

    async sendMessage(message: string) {
        try {
            await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: message,
                })
            })
        } catch (error) {
            throw error;
        }
    }
}