import { Products } from './products';

export interface AllProducts {
  total: number;
  limit: number;
  page: number;
  skip: number;
  products: Products[];
}
