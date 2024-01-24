import { Router } from "express";
import { Controller } from "./controller";
import { GithubService } from "../../services/github.service";
import { envs } from "../../../config";
import { DiscordService } from "../../services/discord.service";
import { AuthGithub } from "../../middlewares";

export class Route {
    static get routes() {
        const github = Router();
        const controller = new Controller(
            new GithubService(),
            new DiscordService(envs.DISCORD_WEBHOOK_URL)
        );
        github.post("/", [AuthGithub.authSecret], controller.github);

        return github;
    }
}