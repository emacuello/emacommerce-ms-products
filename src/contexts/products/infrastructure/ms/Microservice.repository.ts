import { Product, UpdateProduct } from '../../domain/entities/Products';
import { ProductsRepository } from '../../domain/repository/products.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Product as ProductSequelize } from '../sequelize/product.entitySequelize';
import { ErrorCreateProductException } from '../../domain/errors/errorCreated';
import { ErrorDeleteProductException } from '../../domain/errors/errorDeleted';
import { NotFoundProductException } from '../../domain/errors/notFoundProduct';
import { ErrorUpdateProductException } from '../../domain/errors/errorUpdated';
import { Op } from 'sequelize';
import * as ProductsSeed from '../../../../utils/seed/Products.json';

export class MicroserviceRepository extends ProductsRepository {
  constructor(
    @InjectModel(ProductSequelize)
    private productModel: typeof ProductSequelize,
  ) {
    super();
  }
  async create(product: Product): Promise<string> {
    try {
      await this.productModel.create(product.toValue());
      return 'Producto creado correctamente';
    } catch (error) {
      throw new ErrorCreateProductException(error);
    }
  }
  async delete(id: string): Promise<string> {
    try {
      await this.productModel.destroy({ where: { id } });
      return 'Producto eliminado correctamente';
    } catch (error) {
      throw new ErrorDeleteProductException(error);
    }
  }
  async findAll(): Promise<Product[]> {
    try {
      const result = await this.productModel.findAll();
      return result.map((product) => Product.create(product));
    } catch (error) {
      throw new NotFoundProductException(error);
    }
  }
  async findById(id: string): Promise<Product> {
    try {
      const result = await this.productModel.findOne({ where: { id } });
      return Product.create(result);
    } catch (error) {
      throw new NotFoundProductException(error);
    }
  }
  async update(product: UpdateProduct, id: string): Promise<string> {
    try {
      await this.productModel.update(product.toValue(), {
        where: { id },
      });
      return 'Producto actualizado correctamente';
    } catch (error) {
      throw new ErrorUpdateProductException(error);
    }
  }
  async findByIds(id: { id: string }[]): Promise<Product[]> {
    try {
      const ids = id.map((product) => product.id);
      const products = await this.productModel.findAll({
        where: { id: { [Op.in]: ids } },
      });
      return products.map((product) => Product.create(product));
    } catch (error) {
      throw new NotFoundProductException(error);
    }
  }

  async seed(): Promise<void> {
    try {
      await this.productModel.bulkCreate(ProductsSeed);
    } catch (error) {
      throw new ErrorCreateProductException(error);
    }
  }
}
