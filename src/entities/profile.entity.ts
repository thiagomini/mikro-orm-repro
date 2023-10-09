import { Id } from "../id.value-object";

export class Profile {
  public readonly id: number;
  public readonly imageUrl: string;
  public readonly active: boolean;
  public readonly user: Id


  constructor(props: { imageUrl: string, active?: boolean, id?: number, user: Id }) {
    Object.assign(this, props);
  }
}