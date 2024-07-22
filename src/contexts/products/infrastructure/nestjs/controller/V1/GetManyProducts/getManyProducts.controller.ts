import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { GetAllProductsService } from 'src/contexts/products/application/getAllProducts/getAllProducts.service';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { NotFoundProductException } from 'src/contexts/products/domain/errors/notFoundProduct';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class GetManyProductsController {
  constructor(private readonly getManyProductsService: GetAllProductsService) {}

  @MessagePattern('getAllProducts')
  async getMany() {
    try {
      return await this.getManyProductsService.run();
    } catch (error) {
      if (error instanceof NotFoundProductException) {
        throw new RpcException(error);
      }
    }
  }
}
