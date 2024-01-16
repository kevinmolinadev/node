import { sign, verify } from "jsonwebtoken";
import { envs } from "../envs";

const KEY = envs.JWT_KEY;

export class Jwt {

    static generate(payload: any, expiresIn: string | number = "3h") {
        return sign(payload, KEY, { expiresIn })
    }

    static verify(token: string) {
        return verify(token, KEY);
    }
}