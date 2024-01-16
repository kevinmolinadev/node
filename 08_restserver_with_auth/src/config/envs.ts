import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_DB: get("MONGO_DB").required().asString(),
  MONGO_USER: get("MONGO_USER").required().asString(),
  MONGO_PASS: get("MONGO_PASS").required().asString(),
}



