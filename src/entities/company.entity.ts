import { Collection } from "@mikro-orm/core";

import type { User } from "./user.entity";

export class Company {
  public readonly id: number;
  public readonly name: string;
  public readonly users: Collection<User> = new Collection<User>(this);

  constructor(props: { name: string, id?: number }) {
    Object.assign(this, props);
  }
}