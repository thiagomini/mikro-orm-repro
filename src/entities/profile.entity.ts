import { User } from "./user.entity";
import { Ref, Reference } from '@mikro-orm/core'

export class Profile {
  public readonly id: number;
  public readonly imageUrl: string;
  public readonly active: boolean;
  public readonly user?: Ref<User>;

  constructor(props: { imageUrl: string, active?: boolean, id?: number, userId?: number }) {
    Object.assign(this, props, {
      user: Reference.createFromPK(User, props.userId)
    });
  }
}