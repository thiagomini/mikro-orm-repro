import type { User } from "./user.entity";
import { Ref } from '@mikro-orm/core'

export class Profile {
  public readonly id: number;
  public readonly imageUrl: string;
  public readonly active: boolean;
  public readonly user?: Ref<User>;

  constructor(props: { imageUrl: string, active?: boolean, id?: number, user?: Ref<User> }) {
    this.imageUrl = props.imageUrl;
    this.active = props.active ?? true;
    this.id = props.id ?? 0;
    this.user = props.user;
  }
}