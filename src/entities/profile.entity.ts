import { Ref, Reference } from '@mikro-orm/core'

import { User } from "./user.entity";

export class Profile {
  public readonly id: number;
  public readonly imageUrl: string;
  public readonly active: boolean;
  public readonly user?: Ref<User>;

  constructor(props: { imageUrl: string, active?: boolean, id?: number, userId?: number }) {
    this.imageUrl = props.imageUrl;
    this.active = props.active ?? true;
    this.id = props.id ?? 0;
    this.user = Reference.createFromPK(User, props.userId ?? 0);
  }
}