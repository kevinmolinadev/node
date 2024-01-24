import { get } from "env-var";

export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    GITHUB_SECRET_KEY: get("GITHUB_SECRET_KEY").required().asString(),
    DISCORD_WEBHOOK_URL: get("DISCORD_WEBHOOK_URL").required().asString()
}