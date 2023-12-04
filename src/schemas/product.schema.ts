import { BigIntType, EntitySchema } from '@mikro-orm/core';

import { ProductEntity } from '../entities/product.entity';

export const productSchema = new EntitySchema<ProductEntity>({
  class: ProductEntity,
  tableName: 'product',
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    name: {
      type: String,
    },
  },
});
