import type { User } from "./user.entity";
import { Ref } from '@mikro-orm/core'

export class Profile {
  public readonly id: number;
  public readonly imageUrl: string;
  public readonly active: boolean;
  public readonly user?: Ref<User>;

  constructor(props: { imageUrl: string, active?: boolean, id?: number, user?: Ref<User> }) {
    Object.assign(this, props);
  }
}