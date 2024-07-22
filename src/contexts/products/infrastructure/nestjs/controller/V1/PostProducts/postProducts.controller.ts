import { Body, Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { CreateProductService } from 'src/contexts/products/application/createProduct/createProduct.service';
import { ProductsDtos } from './postProduct.dto';
import { ErrorDeleteProductException } from 'src/contexts/products/domain/errors/errorDeleted';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class PostProductsController {
  constructor(private readonly createProductService: CreateProductService) {}

  @MessagePattern('createProduct')
  async create(@Body() createProductDto: ProductsDtos) {
    try {
      return await this.createProductService.run(createProductDto);
    } catch (error) {
      if (error instanceof ErrorDeleteProductException) {
        throw new RpcException(error.message);
      }
    }
  }
}
