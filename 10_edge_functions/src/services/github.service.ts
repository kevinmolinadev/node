import { PushInterface } from "../interfaces/github/push.interface";
import { StarInterface } from "../interfaces/github/star.interface";


export class GithubService {

    static onStart(payload: StarInterface) {
        const { action, sender, repository } = payload;
        return `User [${sender.login}](${sender.html_url}) ${action}  start ⭐ on [${repository.full_name}](${repository.html_url})\n`;
    }

    static onPush(payload: PushInterface) {
        const { repository, pusher, sender, commits } = payload;
        const commitCount = commits.length;
        const head = `### User [${pusher.name}](${sender.html_url}) added ${commitCount} new commit${commitCount > 1 ? "s" : ""} in the repository [${repository.full_name}](${repository.html_url})\n`;
        let body = commits.map((commit) => `- commit: ${commit.message} | [view ⇗](${commit.url})`).join("\n");
        return head + body;
    }
}