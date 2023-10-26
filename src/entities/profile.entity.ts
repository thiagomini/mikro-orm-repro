import { ref, Ref, Reference } from '@mikro-orm/core';

import { User } from "./user.entity";

export type ProfileProps = {
  imageUrl: string;
  active?: boolean;
  id?: number;
  userOrId?: User | number;
}

export class Profile {
  public readonly id: number;
  public readonly imageUrl: string;
  public readonly active: boolean;
  public readonly user?: Ref<User>;

  constructor(props: ProfileProps) {
    this.imageUrl = props.imageUrl;
    this.active = props.active ?? true;
    this.id = props.id ?? 0;
    if (props.userOrId instanceof User) {
      this.user = ref(props.userOrId)
    } else if (props.userOrId){
      this.user = Reference.createFromPK(User, props.userOrId)
    }
  }
}