import { Request, Response } from "express";
import { GithubService } from "../../services/github.service";
import { DiscordService } from "../../services/discord.service";

export class Controller {
    constructor(
        private readonly githubService: GithubService,
        private readonly discordService: DiscordService
    ) { }
    github = (req: Request, res: Response) => {
        const event = req.header("x-github-event") ?? "unknown";
        const body = req.body;
        let message: string;
        switch (event) {
            case "star":
                message = this.githubService.onStart(body)
                break;
            case "push":
                message = this.githubService.onPush(body);
                break;
            default:
                message = `The event ${event} is invalid.`;
                break
        }
        this.discordService.sendMessage(message)
            .then(() => res.status(202).json("Accepted."))
            .catch(e => {
                console.log(e);
                res.status(500).json({ error: e })
            });
    }
}