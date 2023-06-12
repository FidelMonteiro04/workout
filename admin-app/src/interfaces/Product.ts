export interface IProduct {
  _id?: string;
  id?: string | number;
  name: string;
  price: string;
  image: string;
  category: string;
  distributor?: string;
  description: string;
}
