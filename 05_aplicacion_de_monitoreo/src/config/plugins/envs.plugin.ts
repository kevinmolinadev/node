import "dotenv/config";
import * as env from "env-var";

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
    MAILER_EMAIL_KEY: env.get("MAILER_EMAIL_KEY").required().asString(),
    PRODUCTION: env.get("PRODUCTION").asBoolStrict(),
    MONGO_URL: env.get("MONGO_URL").required().asUrlString(),
    MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
    MONGO_USER: env.get("MONGO_USER").required().asString(),
    MONGO_PASS: env.get("MONGO_PASS").required().asString(),
    POSTGRES_URL: env.get("POSTGRES_URL").required().asUrlString(),
    POSTGRES_DB_NAME: env.get("POSTGRES_DB_NAME").required().asString(),
    POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
    POSTGRES_PASS: env.get("POSTGRES_PASS").required().asString(),
}