import { Ref, wrap } from "@mikro-orm/core";

import type { Profile } from "./profile.entity";

export type CreateUserProps = {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: Ref<Profile>
};

export class User {
  public readonly id!: number;
  public readonly firstName!: string;
  public readonly lastName!: string;
  public readonly email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly events!: readonly unknown[];

  public profile?: Ref<Profile>;

  constructor(props: CreateUserProps) {
    wrap<User>(this).assign(props)
  }
}
