import { Reference } from "@mikro-orm/core";

import { User } from "./user.entity";

export class Profile {
  public readonly id: number;
  public readonly imageUrl: string;
  public readonly active: boolean;
  public readonly user: Reference<User>;


  constructor(props: { imageUrl: string, active?: boolean, id?: number, user: User }) {
    Object.assign(this, props);
    this.user = Reference.createFromPK(User, props.user.id);
  }
}