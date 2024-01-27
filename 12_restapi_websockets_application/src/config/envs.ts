import { get } from "env-var";

export class Envs {
    static get PORT() {
        return get("PORT").required().asPortNumber();
    }
}