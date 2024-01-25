import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { GithubService } from "../../src/services/github.service";
import { DiscordService } from "../../src/services/discord.service";
import { AuthGithub } from "../../src/auth/github.auth";

const unauthorized = () => {
  return {
    statusCode: 401,
    body: JSON.stringify({ error: "Unauthorized" }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}

const discord = new DiscordService(process.env.DISCORD_WEBHOOK_URL ?? "");

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const githubEvent = event.headers["x-github-event"];
  const githubSecret = event.headers["x-hub-signature-256"];
  if (!githubSecret || !githubEvent) return unauthorized();
  const isVerify = AuthGithub.verifySignature({ secret: githubSecret, body: event.body! });
  if (!isVerify) return unauthorized();
  const body = JSON.parse(event.body!);
  let message: string;
  switch (githubEvent) {
    case "star":
      message = GithubService.onStart(body)
      break;
    case "push":
      message = GithubService.onPush(body);
      break;
    default:
      message = ``;
  }
  if (message) await discord.sendMessage(message);
  return {
    statusCode: 202,
    body: JSON.stringify("Accepted."),
    headers: {
      "Content-Type": "application/json"
    }
  };
};

export { handler };
