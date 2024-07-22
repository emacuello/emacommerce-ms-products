import { IsUUID } from 'class-validator';

export class GetOneProductDto {
  @IsUUID()
  id: string;
}
