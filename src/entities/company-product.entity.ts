import { Ref } from '@mikro-orm/core/entity';

import { ProductEntity } from './product.entity';

export class CompanyProduct {
  public readonly id: number;
  public readonly product: Ref<ProductEntity>;
  public readonly company: Ref<CompanyProduct>;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}
