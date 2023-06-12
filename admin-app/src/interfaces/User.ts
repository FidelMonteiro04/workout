export interface User {
  token: string;
  ownType?: "store" | "gym";
  ownId?: string;
}
