import { PartialType } from '@nestjs/swagger';
import { ProductsDtos } from '../PostProducts/postProduct.dto';
import { IsUUID } from 'class-validator';

export class PutProductDto extends PartialType(ProductsDtos) {
  @IsUUID()
  id: string;
}
