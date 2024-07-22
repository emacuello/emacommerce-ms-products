import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { DeleteProductService } from 'src/contexts/products/application/deleteProduct/deleteProduct.service';
import { ErrorDeleteProductException } from 'src/contexts/products/domain/errors/errorDeleted';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { DeleteProductDto } from './deletedProduct.dto';

@Controller(V1_ROUTES.BASE)
export class DeleteProductsController {
  constructor(private readonly deleteProductService: DeleteProductService) {}

  @MessagePattern('deleteProduct')
  async delete(@Payload() data: DeleteProductDto) {
    try {
      return await this.deleteProductService.run(data.id);
    } catch (error) {
      if (error instanceof ErrorDeleteProductException) {
        throw new RpcException(error.message);
      }
    }
  }
}
