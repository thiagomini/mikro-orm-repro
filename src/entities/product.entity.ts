export class ProductEntity {
  public readonly id: number;
  public readonly name: string;

  constructor(props: { name: string, id?: number }) {
    Object.assign(this, props);
  }
}