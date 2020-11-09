import { Product } from './product';

export interface Store {
    id: string;
    name: string;
    productsList: Product[];
}