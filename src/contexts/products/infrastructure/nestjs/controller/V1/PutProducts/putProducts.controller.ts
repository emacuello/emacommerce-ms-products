import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { PutProductDto } from './putProducts.dto';
import { UpdateProductService } from 'src/contexts/products/application/updateProduct/updateProduct.service';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ErrorUpdateProductException } from 'src/contexts/products/domain/errors/errorUpdated';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class PutProductsController {
  constructor(private readonly updateProductService: UpdateProductService) {}

  @MessagePattern('updateProduct')
  async update(@Payload() { id, ...body }: PutProductDto) {
    try {
      return await this.updateProductService.run(body, id);
    } catch (error) {
      if (error instanceof ErrorUpdateProductException) {
        throw new RpcException(error.message);
      }
    }
  }
}
