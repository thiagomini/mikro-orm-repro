import { Collection } from "@mikro-orm/core";

import { ProductEntity } from './product.entity';

export class Company {
  public readonly id: number;
  public readonly name: string;
  public readonly products: Collection<ProductEntity> =
    new Collection<ProductEntity>(this);

  constructor(props: { name: string; id?: number }) {
    Object.assign(this, props);
  }
}