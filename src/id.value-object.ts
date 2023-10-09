import { EntityProperty, Platform, Type } from "@mikro-orm/core";

export class Id extends Type<Id | undefined, string> {
  public readonly value: bigint;

  constructor(value: bigint | number) {
    super();
    if (value) {
      this.value = BigInt(value);
    }
  }

  public equals(id?: Id): boolean {
    return this.value === id?.value;
  }

  public asNumber(): number {
    if (this.value > Number.MAX_SAFE_INTEGER) {
      throw new Error(
        'Id is too big to be converted to a number',
      );
    }

    return Number(this.value);
  }

  public convertToDatabaseValue(value: Id): string {
    return value?.value as unknown as string;
  }

  public convertToJSValue(value: string): Id | undefined {
    return value ? new Id(+value) : undefined;
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return platform.getBigIntTypeDeclarationSQL(prop);
  }

  compareAsType(): string {
    return 'string';
  }
}
