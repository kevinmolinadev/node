import { JwtPayload, sign, verify } from "jsonwebtoken";
import { envs } from "../envs";
import { HttpError } from "../../domain";
import { rejects } from "assert";

const KEY = envs.JWT_KEY;

export class Jwt {

    static generate(payload: any, expiresIn: string | number = "3h"): Promise<string> {
        return new Promise((resolve, reject) => {
            sign(payload, KEY, { expiresIn }, (error, token) => {
                if (error) return reject(HttpError.internalServerError(error.message));
                resolve(token!);
            })
        })
    }

    static verify<T>(token: string): Promise<T | JwtPayload> {
        return new Promise((resolve, reject) => {
            verify(token, KEY, (error, payload) => {
                if (error) return reject(HttpError.unauthorized(`${error.message}`));
                resolve(payload as T);
            })
        });
    }
}