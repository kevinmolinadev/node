import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_DB: get("MONGO_DB").required().asString(),
  MONGO_USER: get("MONGO_USER").required().asString(),
  MONGO_PASS: get("MONGO_PASS").required().asString(),
  JWT_KEY: get("JWT_KEY").required().asString(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  MAILER_KEY: get("MAILER_KEY").required().asString(),
  WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
}



