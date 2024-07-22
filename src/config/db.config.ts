import { Dialect } from 'sequelize';
import { Product } from '../contexts/products/infrastructure/sequelize/product.entitySequelize';
import { envs } from './envs';
export const configDatabase = {
  dialect: 'mariadb' as Dialect,
  host: envs.HOST_MARIADB,
  port: envs.PORT_MARIADB,
  username: envs.USERNAME_MARIADB,
  password: envs.PASSWORD_MARIADB,
  database: envs.DATABASE_MARIADB,
  models: [Product],
  autoLoadModels: true,
  synchronize: true,
};
