export class Profile {
  public readonly id: number;
  public readonly imageUrl: string;
  public readonly active: boolean;
  public readonly user: bigint


  constructor(props: { imageUrl: string, active?: boolean, id?: number, user: bigint }) {
    Object.assign(this, props);
  }
}