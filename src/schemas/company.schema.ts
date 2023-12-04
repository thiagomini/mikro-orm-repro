import { BigIntType, EntitySchema } from '@mikro-orm/core';

import { CompanyProduct } from '../entities/company-product.entity';
import { Company } from '../entities/company.entity';
import { ProductEntity } from '../entities/product.entity';

export const companySchema = new EntitySchema<Company>({
  class: Company,
  tableName: 'company',
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    name: {
      type: String,
    },
    products: {
      reference: 'm:n',
      entity: () => ProductEntity,
      pivotEntity: () => CompanyProduct,
    },
  },
});
