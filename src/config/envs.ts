import 'dotenv/config';
import * as joi from 'joi';

interface Env {
  MQTT_URL: string;
  HOST_MARIADB: string;
  PORT_MARIADB: number;
  DATABASE_MARIADB: string;
  USERNAME_MARIADB: string;
  PASSWORD_MARIADB: string;
}
const envsSchema = joi
  .object({
    MQTT_URL: joi.string().required(),
    HOST_MARIADB: joi.string().required(),
    PORT_MARIADB: joi.number().required(),
    DATABASE_MARIADB: joi.string().required(),
    USERNAME_MARIADB: joi.string().required(),
    PASSWORD_MARIADB: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const envs = value as Env;
