import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { configDatabase } from './config/db.config';
import { ProductModule } from './contexts/products/infrastructure/nestjs/module/product.module';

@Module({
  imports: [SequelizeModule.forRoot(configDatabase), ProductModule],
})
export class AppModule {}
