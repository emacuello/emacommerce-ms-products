import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { GetOneProductService } from 'src/contexts/products/application/getOneProduct/getOneProduct.service';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundProductException } from 'src/contexts/products/domain/errors/notFoundProduct';
import { GetOneProductDto } from './getOneProducts.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class GetOneProductsController {
  constructor(private readonly getOneProductService: GetOneProductService) {}

  @MessagePattern('getOneProduct')
  async getOne(@Payload() { id }: GetOneProductDto) {
    try {
      return await this.getOneProductService.run(id);
    } catch (error) {
      if (error instanceof NotFoundProductException)
        throw new RpcException(error.message);
    }
  }
}
