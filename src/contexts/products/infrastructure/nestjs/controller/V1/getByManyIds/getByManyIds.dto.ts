import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';

export class GetByManyIdsDto {
  @ValidateNested({ each: true })
  @Type(() => ids)
  ids: ids[];
}

class ids {
  @IsUUID()
  id: string;
}
