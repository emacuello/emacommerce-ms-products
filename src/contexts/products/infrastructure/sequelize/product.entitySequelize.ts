import {
  Column,
  CreatedAt,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
@Table
export class Product extends Model<Product> {
  @IsUUID(4)
  @PrimaryKey
  @Default(uuidv4)
  @Column
  id: string;
  @Unique
  @Column
  name: string;
  @Column
  description: string;
  @Column
  price: number;
  @Column
  stock: number;
  @Default('https://cdn-icons-png.flaticon.com/512/1822/1822045.png')
  @Column
  imgUrl: string;
  @Column
  category: string;
  @CreatedAt
  createdAt: Date;
  @UpdatedAt
  updatedAt: Date;
}
