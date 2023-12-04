import { BigIntType, EntitySchema } from '@mikro-orm/core';

import { CompanyProduct } from '../entities/company-product.entity';
import { Company } from '../entities/company.entity';
import { ProductEntity } from '../entities/product.entity';

export const companyProductsSchema = new EntitySchema<CompanyProduct>({
  class: CompanyProduct,
  uniques: [
    { name: 'uniqueCompanyProduct', properties: ['company', 'product'] },
  ],
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    product: {
      reference: 'm:1',
      entity: () => ProductEntity,
    },
    company: {
      reference: 'm:1',
      entity: () => Company,
    },
    createdAt: {
      type: 'timestamp',
      onCreate: () => new Date(),
    },
    updatedAt: {
      type: 'timestamp',
      onUpdate: () => new Date(),
    },
  },
});
