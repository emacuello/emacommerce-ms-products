import { PrimitiveProduct } from '../../domain/entities/Products';
import { GetManyProductsDto } from './getManyProducts.dto';
import { ProductsRepository } from '../../domain/repository/products.repository';
import { Injectable } from 'src/utils/dependencyInject/injectable';
import { NotFoundProductException } from '../../domain/errors/notFoundProduct';

@Injectable()
export class GetManyProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  async run(dto: GetManyProductsDto): Promise<Partial<PrimitiveProduct>[]> {
    const result = await this.productRepository.findByIds(dto.ids);
    if (result.length === 0) {
      throw new NotFoundProductException('Producto no encontrado');
    }
    return result.map((product) => product.toValue());
  }
}
