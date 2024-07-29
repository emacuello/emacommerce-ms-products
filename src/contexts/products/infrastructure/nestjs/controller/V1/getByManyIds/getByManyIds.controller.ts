import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { GetManyProductsService } from 'src/contexts/products/application/getManyProducts/getManyProducts.service';
import { GetByManyIdsDto } from './getByManyIds.dto';
import { NotFoundProductException } from 'src/contexts/products/domain/errors/notFoundProduct';

@Controller(V1_ROUTES.BASE)
export class GetByManyIdsController {
  constructor(private readonly getByManyIdsService: GetManyProductsService) {}
  @MessagePattern('getManyProducts')
  async getByManyIds(@Payload() ids: GetByManyIdsDto) {
    try {
      return await this.getByManyIdsService.run(ids);
    } catch (error) {
      if (error instanceof NotFoundProductException) {
        throw new RpcException(error.message);
      }
      throw new RpcException('Error al obtener los productos');
    }
  }
}
